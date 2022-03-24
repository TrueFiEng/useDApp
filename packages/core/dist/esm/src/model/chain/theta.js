export const Theta = {
    chainId: 361,
    chainName: 'Theta',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xe2ec58a54f3ab2714eddbae87533793011f1e14e',
    getExplorerAddressLink: (address) => `https://explorer.thetatoken.org/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://explorer.thetatoken.org/tx/${transactionHash}`,
};
export const ThetaTestnet = {
    chainId: 365,
    chainName: 'ThetaTestnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xf822bf2e728e264c58d7618022addd9cbc780350',
    getExplorerAddressLink: (address) => `https://testnet-explorer.thetatoken.org/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://testnet-explorer.thetatoken.org/tx/${transactionHash}`,
};
export default {
    Theta,
    ThetaTestnet,
};
//# sourceMappingURL=theta.js.map