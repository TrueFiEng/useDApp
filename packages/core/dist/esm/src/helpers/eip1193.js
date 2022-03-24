export function subscribeToProviderEvents(provider, onUpdate, onDisconnect) {
    if (provider === null || provider === void 0 ? void 0 : provider.on) {
        const onConnectListener = (info) => {
            if (info === null || info === void 0 ? void 0 : info.chainId) {
                onUpdate({ chainId: Number(info.chainId) });
            }
        };
        provider.on('connect', onConnectListener);
        const onDisconnectListener = (error) => {
            onDisconnect(new Error(error));
        };
        provider.on('disconnect', onDisconnectListener);
        const onChainChangedListener = (chainId) => {
            onUpdate({ chainId: Number(chainId) });
        };
        provider.on('chainChanged', onChainChangedListener);
        const onAccountsChangedListener = (accounts) => {
            onUpdate({ accounts });
        };
        provider.on('accountsChanged', onAccountsChangedListener);
        return () => {
            provider.removeListener('connect', onConnectListener);
            provider.removeListener('disconnect', onDisconnectListener);
            provider.removeListener('chainChanged', onChainChangedListener);
            provider.removeListener('accountsChanged', onAccountsChangedListener);
        };
    }
    return () => undefined;
}
//# sourceMappingURL=eip1193.js.map