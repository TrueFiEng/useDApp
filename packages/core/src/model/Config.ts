import { ChainId } from '../constants'

export type NodeUrls = {
  [chainId: number]: string
}

export type MulticallAddresses = {
  [chainId: number]: string
}

export type Config = {
  readOnlyChain?: ChainId
  readOnlyUrls?: NodeUrls
  multicallAddresses?: MulticallAddresses
  supportedChains: number[]
  pollingInterval?: number
}

export const DEFAULT_CONFIG: Config = {
  pollingInterval: 15000,
  supportedChains: [ChainId.Mainnet, ChainId.Gorli, ChainId.Kovan, ChainId.Rinkeby, ChainId.Ropsten, ChainId.xDai],
}
