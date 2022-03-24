import { useContext } from 'react';
import { MultiChainStatesContext, useNetwork } from '../providers';
export function useChainState(queryParams = {}) {
    var _a;
    const multiChainState = useContext(MultiChainStatesContext);
    const { network } = useNetwork();
    const chainId = (_a = queryParams.chainId) !== null && _a !== void 0 ? _a : network.chainId;
    if (chainId === undefined) {
        return undefined;
    }
    return Object.assign(Object.assign({}, multiChainState.chains[chainId]), { dispatchCalls: multiChainState.dispatchCalls });
}
//# sourceMappingURL=useChainState.js.map