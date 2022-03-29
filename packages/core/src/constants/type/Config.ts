import { Chain } from '../../constants'
import { BaseProvider } from '@ethersproject/providers'

export type NodeUrls = {
  [chainId: number]: string | BaseProvider
}

export type MulticallAddresses = {
  [chainId: number]: string
}

/**
 * useDapp configuration.
 * @public
 */
export type FullConfig = {
  /**
   * ChainId of a chain you want to connect to by default in a read-only mode
   */
  readOnlyChainId?: number
  /**
   * Mapping of ChainId's to node URLs to use in read-only mode.
   */
  readOnlyUrls?: NodeUrls
  /**
   * Mapping of ChainId's to multicall contract addresses on the chain.
   */
  multicallAddresses?: MulticallAddresses
  /**
   * Version of multicall contract on the chain.
   */
  multicallVersion: 1 | 2
  /**
   * @deprecated
   */
  supportedChains?: number[]
  /**
   * List of intended supported chain configs.
   * If a user tries to connect to an unsupported chain an error value will be returned by useEthers.
   * @default DEFAULT_SUPPORTED_CHAINS
   */
  networks?: Chain[]
  /**
   * Polling interval for a new block.
   */
  pollingInterval: number

  notifications: {
    checkInterval: number
    expirationPeriod: number
  }
  /**
   * Paths to locations in local storage.
   */
  localStorage: {
    transactionPath: string
  }
  /**
   * Enables reconnecting to last used provider when user revisits the page.
   */
  autoConnect: boolean
}

/**
 * useDapp configuration.
 * @public
 */
export type Config = Partial<FullConfig>
