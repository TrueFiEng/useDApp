import { ChainId } from '../../constants'

export type NodeUrls = {
  [chainId: number]: string
}

export type MulticallAddresses = {
  [chainId: number]: string
}

export type Config = {
  readOnlyChainId?: ChainId
  readOnlyUrls?: NodeUrls
  multicallAddresses?: MulticallAddresses
  supportedChains: number[]
  pollingInterval?: number
}
