import { useMemo } from 'react';
import { useChainCalls } from './useChainCalls';
function warnOnInvalidContractCall(call) {
    console.warn(`Invalid contract call: address=${call && call.address} method=${call && call.method} args=${call && call.args}`);
}
function encodeCallData(call) {
    try {
        return call && { address: call.address, data: call.abi.encodeFunctionData(call.method, call.args) };
    }
    catch (_a) {
        warnOnInvalidContractCall(call);
        return undefined;
    }
}
export function useContractCall(call) {
    return useContractCalls([call])[0];
}
export function useContractCalls(calls) {
    const results = useChainCalls(calls.map(encodeCallData));
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