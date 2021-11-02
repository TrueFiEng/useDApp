"use strict";
exports.__esModule = true;
exports.useContractCalls = exports.useContractCall = void 0;
var react_1 = require("react");
var useChainCalls_1 = require("./useChainCalls");
function warnOnInvalidContractCall(call) {
    console.warn("Invalid contract call: address=" + (call && call.address) + " method=" + (call && call.method) + " args=" + (call && call.args));
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
function useContractCall(call) {
    return useContractCalls([call])[0];
}
exports.useContractCall = useContractCall;
function useContractCalls(calls) {
    var results = useChainCalls_1.useChainCalls(calls.map(encodeCallData));
    return react_1.useMemo(function () {
        return results.map(function (result, idx) {
            var call = calls[idx];
            if (result === '0x') {
                warnOnInvalidContractCall(call);
                return undefined;
            }
            return call && result ? call.abi.decodeFunctionResult(call.method, result) : undefined;
        });
    }, [results]);
}
exports.useContractCalls = useContractCalls;
//# sourceMappingURL=useContractCall.js.map