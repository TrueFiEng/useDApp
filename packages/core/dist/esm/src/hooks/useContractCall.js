import { useMemo } from 'react';
import { useChainCalls } from './useChainCalls';
import { useNetwork } from '../providers';
function warnOnInvalidContractCall(call) {
    console.warn(`Invalid contract call: address=${call && call.address} method=${call && call.method} args=${call && call.args}`);
}
function encodeCallData(call, chainId) {
    if (!call) {
        return undefined;
    }
    if (!call.address || !call.method) {
        warnOnInvalidContractCall(call);
        return undefined;
    }
    try {
        return { address: call.address, data: call.abi.encodeFunctionData(call.method, call.args), chainId };
    }
    catch (_a) {
        warnOnInvalidContractCall(call);
        return undefined;
    }
}
export function useContractCall(call, queryParams = {}) {
    return useContractCalls([call], queryParams)[0];
}
export function useContractCalls(calls, queryParams = {}) {
    var _a;
    const { network } = useNetwork();
    const chainId = (_a = queryParams.chainId) !== null && _a !== void 0 ? _a : network.chainId;
    const results = useChainCalls(calls.map((call) => (chainId !== undefined ? encodeCallData(call, chainId) : undefined)));
    return useMemo(() => results.map((result, idx) => {
        const call = calls[idx];
        if (result === '0x') {
            warnOnInvalidContractCall(call);
            return undefined;
        }
        return call && result ? call.abi.decodeFunctionResult(call.method, result) : undefined;
    }), [results]);
}
//# sourceMappingURL=useContractCall.js.map