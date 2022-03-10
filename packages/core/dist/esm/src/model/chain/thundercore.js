export const ThunderCore = {
    chainId: 108,
    chainName: 'ThunderCore Mainnet',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x3017086DeEf56679e267F67F66c4415109b7A97f',
    multicall2Address: '0xd1dC5CF410b227dFEeFEe8D3c1C9DB4FBE66d362',
    getExplorerAddressLink: (address) => `https://viewblock.io/thundercore/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://viewblock.io/thundercore/tx/${transactionHash}`,
};
export const ThunderCoreTestnet = {
    chainId: 18,
    chainName: 'ThunderCore Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x7818a6A0fFe134b2aF30850DCE7c86A52eC6AC4F',
    multicall2Address: '0x02C5503dd793cC457a1CE50d2d31a749cb5e9cB5',
    getExplorerAddressLink: (address) => `https://explorer-testnet.thundercore.com/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://explorer-testnet.thundercore.com/tx/${transactionHash}`,
};
export default {
    ThunderCore,
    ThunderCoreTestnet,
};
//# sourceMappingURL=thundercore.js.map