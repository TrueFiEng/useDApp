import { ChainId } from '../../constants'

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
