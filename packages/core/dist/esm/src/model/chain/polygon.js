export const Polygon = {
    chainId: 137,
    chainName: 'Polygon',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
    getExplorerAddressLink: (address) => `https://polygonscan.com/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://polygonscan.com/tx/${transactionHash}`,
};
export const Mumbai = {
    chainId: 80001,
    chainName: 'Mumbai',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc',
    getExplorerAddressLink: (address) => `https://mumbai.polygonscan.com/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://mumbai.polygonscan.com/tx/${transactionHash}`,
};
export default { Polygon, Mumbai };
//# sourceMappingURL=polygon.js.map