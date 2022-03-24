"use strict";
exports.__esModule = true;
exports.subscribeToProviderEvents = void 0;
function subscribeToProviderEvents(provider, onUpdate, onDisconnect) {
    if (provider === null || provider === void 0 ? void 0 : provider.on) {
        var onConnectListener_1 = function (info) {
            if (info === null || info === void 0 ? void 0 : info.chainId) {
                onUpdate({ chainId: Number(info.chainId) });
            }
        };
        provider.on('connect', onConnectListener_1);
        var onDisconnectListener_1 = function (error) {
            onDisconnect(new Error(error));
        };
        provider.on('disconnect', onDisconnectListener_1);
        var onChainChangedListener_1 = function (chainId) {
            onUpdate({ chainId: Number(chainId) });
        };
        provider.on('chainChanged', onChainChangedListener_1);
        var onAccountsChangedListener_1 = function (accounts) {
            onUpdate({ accounts: accounts });
        };
        provider.on('accountsChanged', onAccountsChangedListener_1);
        return function () {
            provider.removeListener('connect', onConnectListener_1);
            provider.removeListener('disconnect', onDisconnectListener_1);
            provider.removeListener('chainChanged', onChainChangedListener_1);
            provider.removeListener('accountsChanged', onAccountsChangedListener_1);
        };
    }
    return function () { return undefined; };
}
exports.subscribeToProviderEvents = subscribeToProviderEvents;
//# sourceMappingURL=eip1193.js.map