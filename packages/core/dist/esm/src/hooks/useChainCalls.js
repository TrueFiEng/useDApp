import { useRawCalls } from './useRawCalls';
/**
 * @deprecated It's recommended to use useRawCalls instead
 */
export function useChainCalls(calls) {
    const results = useRawCalls(calls);
    return results.map((result) => result === null || result === void 0 ? void 0 : result.value);
}
/**
 * @deprecated It's recommended to use useRawCall instead
 */
export function useChainCall(call) {
    return useChainCalls([call])[0];
}
//# sourceMappingURL=useChainCalls.js.map