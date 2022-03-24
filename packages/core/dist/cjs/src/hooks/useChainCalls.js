"use strict";
exports.__esModule = true;
exports.useChainCall = exports.useChainCalls = void 0;
var useRawCalls_1 = require("./useRawCalls");
/**
 * @deprecated It's recommended to use useRawCalls instead
 */
function useChainCalls(calls) {
    var results = (0, useRawCalls_1.useRawCalls)(calls);
    return results.map(function (result) { return result === null || result === void 0 ? void 0 : result.value; });
}
exports.useChainCalls = useChainCalls;
/**
 * @deprecated It's recommended to use useRawCall instead
 */
function useChainCall(call) {
    return useChainCalls([call])[0];
}
exports.useChainCall = useChainCall;
//# sourceMappingURL=useChainCalls.js.map