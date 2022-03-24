import { useMemo } from 'react';
import { useRawCalls } from './useRawCalls';
import { decodeCallResult, encodeCallData } from '../helpers';
import { useNetwork } from '../providers';
export function useCall(call) {
    return useCalls([call])[0];
}
export function useCalls(calls, queryParams = {}) {
    var _a;
    const { network } = useNetwork();
    const chainId = (_a = queryParams.chainId) !== null && _a !== void 0 ? _a : network.chainId;
    const rawCalls = calls.map((call) => (chainId !== undefined ? encodeCallData(call, chainId) : undefined));
    const results = useRawCalls(rawCalls);
    return useMemo(() => results.map((result, idx) => decodeCallResult(calls[idx], result)), [results]);
}
//# sourceMappingURL=useCall.js.map