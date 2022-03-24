"use strict";
exports.__esModule = true;
exports.useContractCalls = exports.useContractCall = void 0;
var react_1 = require("react");
var useChainCalls_1 = require("./useChainCalls");
var providers_1 = require("../providers");
function warnOnInvalidContractCall(call) {
    console.warn("Invalid contract call: address=".concat(call && call.address, " method=").concat(call && call.method, " args=").concat(call && call.args));
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
        return { address: call.address, data: call.abi.encodeFunctionData(call.method, call.args), chainId: chainId };
    }
    catch (_a) {
        warnOnInvalidContractCall(call);
        return undefined;
    }
}
function useContractCall(call, queryParams) {
    if (queryParams === void 0) { queryParams = {}; }
    return useContractCalls([call], queryParams)[0];
}
exports.useContractCall = useContractCall;
function useContractCalls(calls, queryParams) {
    var _a;
    if (queryParams === void 0) { queryParams = {}; }
    var network = (0, providers_1.useNetwork)().network;
    var chainId = (_a = queryParams.chainId) !== null && _a !== void 0 ? _a : network.chainId;
    var results = (0, useChainCalls_1.useChainCalls)(calls.map(function (call) { return (chainId !== undefined ? encodeCallData(call, chainId) : undefined); }));
    return (0, react_1.useMemo)(function () {
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