"use strict";
exports.__esModule = true;
exports.subscribeToNewBlock = void 0;
function subscribeToNewBlock(provider, chainId, dispatch) {
    if (provider && chainId !== undefined) {
        var update_1 = function (blockNumber) { return dispatch({ chainId: chainId, blockNumber: blockNumber }); };
        provider.on('block', update_1);
        provider.getBlockNumber().then(function (blockNumber) { return update_1(blockNumber); }, function (err) {
            console.error(err);
        });
        return function () {
            provider.off('block', update_1);
        };
    }
    return function () { return undefined; };
}
exports.subscribeToNewBlock = subscribeToNewBlock;
//# sourceMappingURL=subscribeToNewBlock.js.map