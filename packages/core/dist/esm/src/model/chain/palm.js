export const Palm = {
    chainId: 11297108109,
    chainName: 'Palm',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x99a73dfE34578348fb81BD078201C0BA84E9c840',
    getExplorerAddressLink: (address) => `https://explorer.palm.io/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://explorer.palm.io/tx/${transactionHash}`,
};
export const PalmTestnet = {
    chainId: 11297108099,
    chainName: 'Palm Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x99a73dfE34578348fb81BD078201C0BA84E9c840',
    getExplorerAddressLink: (address) => `https://explorer.palm-uat.xyz/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://explorer.palm-uat.xyz/tx/${transactionHash}`,
};
export default { Palm, PalmTestnet };
//# sourceMappingURL=palm.js.map