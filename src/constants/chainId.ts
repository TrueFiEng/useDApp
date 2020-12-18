export enum ChainId {
  Mainnet = 1,
  Ropsten = 3,
  Rinkeby = 4,
  Goerli = 5,
  Kovan = 42,
}

export const SUPPORTED_CHAINS = [ChainId.Mainnet, ChainId.Ropsten, ChainId.Rinkeby, ChainId.Goerli, ChainId.Kovan]