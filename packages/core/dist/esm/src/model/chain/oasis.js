export const OasisEmerald = {
    chainId: 42262,
    chainName: 'OasisEmerald',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xA1513CE1a147BB84E04cD61d877d598C018a460F',
    getExplorerAddressLink: (address) => `https://explorer.emerald.oasis.dev/address/${address}/transactions`,
    getExplorerTransactionLink: (transactionHash) => `https://explorer.emerald.oasis.dev/tx/${transactionHash}/internal-transactions`,
};
export const OasisEmeraldTestnet = {
    chainId: 42261,
    chainName: 'OasisEmeraldTestnet',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xB2929229096d2ee6850c4d3906ef2d1f1330cdc7',
    getExplorerAddressLink: (address) => `https://testnet.explorer.emerald.oasis.dev/address/${address}/transactions`,
    getExplorerTransactionLink: (transactionHash) => `https://testnet.explorer.emerald.oasis.dev/tx/${transactionHash}/internal-transactions`,
};
export default { OasisEmerald, OasisEmeraldTestnet };
//# sourceMappingURL=oasis.js.map