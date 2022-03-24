export const ArbitrumRinkeby = {
    chainId: 421611,
    chainName: 'ArbitrumRinkeby',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xd27BEFd29F8Da4E187fDAEf663aEDF7742f9F47F',
    getExplorerAddressLink: (address) => `https://testnet.arbiscan.io/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://testnet.arbiscan.io/tx/${transactionHash}`,
};
export const Arbitrum = {
    chainId: 42161,
    chainName: 'Arbitrum',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x8a0bd1773139C6609e861B9ab68082587a3cD581',
    multicall2Address: '0x80c7dd17b01855a6d2347444a0fcc36136a314de',
    getExplorerAddressLink: (address) => `https://arbiscan.io/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://arbiscan.io/tx/${transactionHash}`,
};
export default {
    ArbitrumRinkeby,
    Arbitrum,
};
//# sourceMappingURL=arbitrum.js.map