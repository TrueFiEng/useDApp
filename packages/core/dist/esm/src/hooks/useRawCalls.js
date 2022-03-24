import { useContext, useEffect, useMemo } from 'react';
import { MultiChainStatesContext } from '../providers';
import { useEthers } from './useEthers';
export function useRawCalls(calls) {
    const { dispatchCalls, chains } = useContext(MultiChainStatesContext);
    const { chainId } = useEthers();
    useEffect(() => {
        const filteredCalls = calls.filter(Boolean);
        dispatchCalls({ type: 'ADD_CALLS', calls: filteredCalls });
        return () => dispatchCalls({ type: 'REMOVE_CALLS', calls: filteredCalls });
    }, [JSON.stringify(calls), dispatchCalls]);
    return useMemo(() => calls.map((call) => {
        return call ? extractCallResult(chains, call, chainId) : undefined;
    }), [JSON.stringify(calls), chains]);
}
export function useRawCall(call) {
    return useRawCalls([call])[0];
}
function extractCallResult(chains, call, defaultChainId) {
    var _a, _b, _c, _d, _e;
    const chainId = (_a = call.chainId) !== null && _a !== void 0 ? _a : defaultChainId;
    return chainId !== undefined ? (_e = (_d = (_c = (_b = chains[chainId]) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d[call.address]) === null || _e === void 0 ? void 0 : _e[call.data] : undefined;
}
//# sourceMappingURL=useRawCalls.js.map