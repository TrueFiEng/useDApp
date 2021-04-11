export enum ChainId {
  Mainnet = 1,
  Ropsten = 3,
  Rinkeby = 4,
  Goerli = 5,
  Kovan = 42,
  xDai = 100,
  Localhost = 1337,
  Hardhat = 31337,
}

export const CHAIN_NAMES = {
  [ChainId.Mainnet]: 'Mainnet',
  [ChainId.Ropsten]: 'Ropsten',
  [ChainId.Kovan]: 'Kovan',
  [ChainId.Rinkeby]: 'Rinkeby',
  [ChainId.Goerli]: 'Goerli',
  [ChainId.xDai]: 'xDai',
  [ChainId.Localhost]: 'Localhost',
  [ChainId.Hardhat]: 'Hardhat',
}

export const MULTICALL_ADDRESSES = {
  [ChainId.Mainnet]: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
  [ChainId.Ropsten]: '0x53c43764255c17bd724f74c4ef150724ac50a3ed',
  [ChainId.Rinkeby]: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
  [ChainId.Goerli]: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
  [ChainId.Kovan]: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
  [ChainId.xDai]: '0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a',
}

export const TEST_CHAINS = [
  ChainId.Ropsten,
  ChainId.Kovan,
  ChainId.Rinkeby,
  ChainId.Goerli,
  ChainId.Localhost,
  ChainId.Hardhat,
]
