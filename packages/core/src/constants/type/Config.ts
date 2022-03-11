import { Chain } from '../../constants'

export type NodeUrls = {
  [chainId: number]: string
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
   * Mapping of ChainId's to multicall addresses to use for queries.
   * See https://github.com/makerdao/multicall.
   */
  multicallAddresses?: MulticallAddresses
  /**
   * Version of the multicall contract.
   * Either 1 or 2
   */
  multicallVersion: 1 | 2
  /**
   * List of intended supported chains.
   * If a user tries to connect to an unsupported chain an error value will be returned by useEthers.
   * @default {} [ChainId.Mainnet, ChainId.Goerli, ChainId.Kovan, ChainId.Rinkeby, ChainId.Ropsten, ChainId.xDai]
   * @deprecated Use `networks` instead.
   */
  supportedChains?: number[]
  /**
   * List of intended supported chain configs.
   * If a user tries to connect to an unsupported chain an error value will be returned by useEthers.
   * Check the full list in https://github.com/TrueFiENg/useDApp/tree/master/packages/core/src/model/chain
   * @default {} [Localhost, Hardhat, Mainnet, Ropsten, Rinkeby, Goerli, Kovan...]
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
