"use strict";
exports.__esModule = true;
exports.performMulticall = void 0;
var devtools_1 = require("../../devtools");
function performMulticall(provider, multicallExecutor, multicallAddress, blockNumber, uniqueCalls, dispatchState, chainId, reportError) {
    var start = Date.now();
    multicallExecutor(provider, multicallAddress, blockNumber, uniqueCalls)
        .then(function (state) {
        dispatchState({ type: 'FETCH_SUCCESS', blockNumber: blockNumber, chainId: chainId, state: state });
        (0, devtools_1.notifyDevtools)({
            type: 'MULTICALL_SUCCESS',
            duration: Date.now() - start,
            chainId: chainId,
            blockNumber: blockNumber,
            multicallAddress: multicallAddress,
            state: state
        });
    })["catch"](function (error) {
        reportError(error);
        dispatchState({ type: 'FETCH_ERROR', blockNumber: blockNumber, chainId: chainId, error: error });
        (0, devtools_1.notifyDevtools)({
            type: 'MULTICALL_ERROR',
            duration: Date.now() - start,
            chainId: chainId,
            blockNumber: blockNumber,
            multicallAddress: multicallAddress,
            calls: uniqueCalls,
            error: error
        });
    });
}
exports.performMulticall = performMulticall;
//# sourceMappingURL=performMulticall.js.map