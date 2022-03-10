"use strict";
exports.__esModule = true;
exports.useCalls = exports.useCall = void 0;
var react_1 = require("react");
var useRawCalls_1 = require("./useRawCalls");
var helpers_1 = require("../helpers");
var providers_1 = require("../providers");
function useCall(call) {
    return useCalls([call])[0];
}
exports.useCall = useCall;
function useCalls(calls, queryParams) {
    var _a;
    if (queryParams === void 0) { queryParams = {}; }
    var network = (0, providers_1.useNetwork)().network;
    var chainId = (_a = queryParams.chainId) !== null && _a !== void 0 ? _a : network.chainId;
    var rawCalls = calls.map(function (call) { return (chainId !== undefined ? (0, helpers_1.encodeCallData)(call, chainId) : undefined); });
    var results = (0, useRawCalls_1.useRawCalls)(rawCalls);
    return (0, react_1.useMemo)(function () { return results.map(function (result, idx) { return (0, helpers_1.decodeCallResult)(calls[idx], result); }); }, [results]);
}
exports.useCalls = useCalls;
//# sourceMappingURL=useCall.js.map