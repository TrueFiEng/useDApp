import { utils } from 'ethers';
import { addressEqual } from './address';
export function warnOnInvalidCall(call) {
    if (!call) {
        return;
    }
    const { contract, method, args } = call;
    console.warn(`Invalid contract call: address=${contract.address} method=${method} args=${args}`);
}
export function encodeCallData(call, chainId) {
    if (!call) {
        return undefined;
    }
    const { contract, method, args } = call;
    if (!contract.address || !method) {
        warnOnInvalidCall(call);
        return undefined;
    }
    try {
        return { address: contract.address, data: contract.interface.encodeFunctionData(method, args), chainId };
    }
    catch (_a) {
        warnOnInvalidCall(call);
        return undefined;
    }
}
export function getUniqueCalls(requests) {
    const unique = [];
    for (const request of requests) {
        if (!unique.find((x) => addressEqual(x.address, request.address) && x.data === request.data && x.chainId === request.chainId)) {
            unique.push(request);
        }
    }
    return unique;
}
export function decodeCallResult(call, result) {
    if (!result || !call) {
        return undefined;
    }
    const { value, success } = result;
    try {
        if (success) {
            return {
                value: call.contract.interface.decodeFunctionResult(call.method, value),
                error: undefined,
            };
        }
        else {
            const errorMessage = new utils.Interface(['function Error(string)']).decodeFunctionData('Error', value)[0];
            return {
                value: undefined,
                error: new Error(errorMessage),
            };
        }
    }
    catch (error) {
        return {
            value: undefined,
            error: error,
        };
    }
}
//# sourceMappingURL=calls.js.map