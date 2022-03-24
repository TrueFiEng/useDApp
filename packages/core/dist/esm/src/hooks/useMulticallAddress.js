import { useChainState } from './useChainState';
export function useMulticallAddress(queryParams = {}) {
    var _a;
    return (_a = useChainState(queryParams)) === null || _a === void 0 ? void 0 : _a.multicallAddress;
}
//# sourceMappingURL=useMulticallAddress.js.map