export const Mainnet = {
    chainId: 1,
    chainName: 'Mainnet',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
    multicall2Address: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
    getExplorerAddressLink: (address) => `https://etherscan.io/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://etherscan.io/tx/${transactionHash}`,
};
export const Ropsten = {
    chainId: 3,
    chainName: 'Ropsten',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x53c43764255c17bd724f74c4ef150724ac50a3ed',
    multicall2Address: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
    getExplorerAddressLink: (address) => `https://ropsten.etherscan.io/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://ropsten.etherscan.io/tx/${transactionHash}`,
};
export const Rinkeby = {
    chainId: 4,
    chainName: 'Rinkeby',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
    multicall2Address: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
    getExplorerAddressLink: (address) => `https://rinkeby.etherscan.io/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://rinkeby.etherscan.io/tx/${transactionHash}`,
};
export const Goerli = {
    chainId: 5,
    chainName: 'Goerli',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
    multicall2Address: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
    getExplorerAddressLink: (address) => `https://goerli.etherscan.io/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://goerli.etherscan.io/tx/${transactionHash}`,
};
export const Kovan = {
    chainId: 42,
    chainName: 'Kovan',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
    multicall2Address: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
    getExplorerAddressLink: (address) => `https://kovan.etherscan.io/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://kovan.etherscan.io/tx/${transactionHash}`,
};
export default {
    Mainnet,
    Ropsten,
    Rinkeby,
    Goerli,
    Kovan,
};
//# sourceMappingURL=ethereum.js.map