export function subscribeToNewBlock(provider, chainId, dispatch) {
    if (provider && chainId !== undefined) {
        const update = (blockNumber) => dispatch({ chainId, blockNumber });
        provider.on('block', update);
        provider.getBlockNumber().then((blockNumber) => update(blockNumber), (err) => {
            console.error(err);
        });
        return () => {
            provider.off('block', update);
        };
    }
    return () => undefined;
}
//# sourceMappingURL=subscribeToNewBlock.js.map