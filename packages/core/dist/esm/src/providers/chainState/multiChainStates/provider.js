import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useMemo, useReducer } from 'react';
import { useDebouncePair } from '../../../hooks';
import { MultiChainStatesContext } from './context';
import { callsReducer, chainStateReducer, getUniqueCalls, multicall as multicall1, multicall2, useConfig, useNetwork, } from '../../..';
import { useReadonlyNetworks } from '../../network';
import { useBlockNumbers } from '../../blockNumber/blockNumbers';
import { fromEntries } from '../../../helpers/fromEntries';
import { performMulticall } from '../common/performMulticall';
function composeChainState(networks, state, multicallAddresses) {
    return fromEntries(Object.keys(networks).map((chainId) => [
        Number(chainId),
        {
            value: state[Number(chainId)],
            multicallAddress: multicallAddresses[Number(chainId)],
        },
    ]));
}
export function MultiChainStateProvider({ children, multicallAddresses }) {
    const { multicallVersion } = useConfig();
    const networks = useReadonlyNetworks();
    const blockNumbers = useBlockNumbers();
    const { reportError } = useNetwork();
    const [calls, dispatchCalls] = useReducer(callsReducer, []);
    const [state, dispatchState] = useReducer(chainStateReducer, {});
    const multicall = multicallVersion === 1 ? multicall1 : multicall2;
    const [debouncedCalls, debouncedNetworks] = useDebouncePair(calls, networks, 50);
    const uniqueCalls = debouncedNetworks === networks ? getUniqueCalls(debouncedCalls) : [];
    // used for deep equality in hook dependencies
    const uniqueCallsJSON = JSON.stringify(uniqueCalls);
    function multicallForChain(chainId, provider) {
        const blockNumber = blockNumbers[chainId];
        const multicallAddress = multicallAddresses[chainId];
        if (!provider || !blockNumber) {
            return;
        }
        if (!multicallAddress) {
            reportError(new Error(`Missing multicall address for chain id ${chainId}`));
            return;
        }
        const callsOnThisChain = uniqueCalls.filter((call) => call.chainId === chainId);
        if (callsOnThisChain.length === 0) {
            return;
        }
        performMulticall(provider, multicall, multicallAddress, blockNumber, callsOnThisChain, dispatchState, chainId, reportError);
    }
    useEffect(() => {
        for (const [_chainId, provider] of Object.entries(networks)) {
            multicallForChain(Number(_chainId), provider);
        }
    }, [blockNumbers, networks, multicallAddresses, uniqueCallsJSON]);
    const chains = useMemo(() => composeChainState(networks, state, multicallAddresses), [
        state,
        multicallAddresses,
        networks,
    ]);
    const provided = { chains, dispatchCalls };
    return _jsx(MultiChainStatesContext.Provider, { value: provided, children: children });
}
//# sourceMappingURL=provider.js.map