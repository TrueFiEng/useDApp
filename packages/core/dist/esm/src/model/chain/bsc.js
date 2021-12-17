export const BSC = {
    chainId: 56,
    chainName: 'BSC',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x41263cba59eb80dc200f3e2544eda4ed6a90e76c',
    getExplorerAddressLink: (address) => `https://bscscan.com/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://bscscan.com/tx/${transactionHash}`,
};
export const BSCTestnet = {
    chainId: 97,
    chainName: 'BSCTestnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C',
    getExplorerAddressLink: (address) => `https://testnet.bscscan.com/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://testnet.bscscan.com/tx/${transactionHash}`,
};
export default {
    BSC,
    BSCTestnet,
};
//# sourceMappingURL=bsc.js.map