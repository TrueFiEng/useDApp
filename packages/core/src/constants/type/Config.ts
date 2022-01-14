import { ChainId, Chain } from '../../constants'
import { initializeConnector } from '@web3-react/core'

export type ConnectorTuple = ReturnType<typeof initializeConnector>

export type NodeUrls = {
  [chainId: number]: string
}

export type MulticallAddresses = {
  [chainId: number]: string
}

export type FullConfig = {
  readOnlyChainId?: ChainId
  readOnlyUrls?: NodeUrls
  multicallAddresses?: MulticallAddresses
  supportedChains?: number[]
  networks?: Chain[]
  pollingInterval?: number
  notifications: {
    checkInterval: number
    expirationPeriod: number
  }
  localStorage: {
    transactionPath: string
  }
  autoConnect: boolean
  defaultConnectors: ConnectorTuple[]
}

export type Config = Partial<FullConfig>
