export const Mainnet = {
  chainId: 1,
  chainName: 'Mainnet',
  isTestChain: false,
  MULTICALL_ADDRESS: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
  getExplorerAddressLink: (address: string) => `https://etherscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://etherscan.io/tx/${transactionHash}`,
}

export const Ropsten = {
  chainId: 3,
  chainName: 'Ropsten',
  isTestChain: true,
  MULTICALL_ADDRESS: '0x53c43764255c17bd724f74c4ef150724ac50a3ed',
  getExplorerAddressLink: (address: string) => `https://ropsten.etherscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://ropsten.etherscan.io/tx/${transactionHash}`,
}

export const Rinkeby = {
  chainId: 4,
  chainName: 'Rinkeby',
  isTestChain: true,
  MULTICALL_ADDRESS: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
  getExplorerAddressLink: (address: string) => `https://rinkeby.etherscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://rinkeby.etherscan.io/tx/${transactionHash}`,
}

export const Goerli = {
  chainId: 5,
  chainName: 'Goerli',
  isTestChain: true,
  MULTICALL_ADDRESS: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
  getExplorerAddressLink: (address: string) => `https://goerli.etherscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://goerli.etherscan.io/tx/${transactionHash}`,
}

export const Kovan = {
  chainId: 42,
  chainName: 'Kovan',
  isTestChain: true,
  MULTICALL_ADDRESS: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
  getExplorerAddressLink: (address: string) => `https://kovan.etherscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://kovan.etherscan.io/tx/${transactionHash}`,
}

export default {
  Mainnet,
  Ropsten,
  Rinkeby,
  Goerli,
  Kovan,
}
