import { Chain } from '../../constants'
import { Connector } from '../../providers/network/connectors/connector'
import { providers } from 'ethers'

export type BaseProviderFactory = () => providers.BaseProvider

export type NodeUrls = {
  [chainId: number]: string | providers.BaseProvider | BaseProviderFactory
}

export type MulticallAddresses = {
  [chainId: number]: string
}

export type PollingIntervals = {
  [chaindId: number]: number
}

/**
 * useDApp configuration.
 * @public
 */
export interface FullConfig {
  /**
   * ChainId of a chain you want to connect to by default in a read-only mode
   */
  readOnlyChainId?: number
  /**
   * Mapping of ChainId's to node URLs to use in read-only mode.
   * @Example
   * {
   *   ...
   *   readOnlyUrls: {
   *     [Mainnet.chainId]: 'https://mainnet.infura.io/v3/xxx',
   *     [Goerli.chainId]: getDefaultProvider('goerli')
   *   }
   * }
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
   * When set to `true`, improves performance by using optimized encoders and decoders for multicall data.
   * @experimental
   * @defaultValue false
   */
  fastMulticallEncoding?: boolean
  /**
   * Don't listen on `disconnect` event from Metamask. Might be useful in dealing with [this Metamask bug](https://github.com/MetaMask/metamask-extension/issues/13375).
   * @experimental
   * @defaultValue false
   */
  noMetamaskDeactivate?: boolean
  /**
   * List of intended supported chains. If a user tries to connect to an unsupported chain an error value will be returned by useEthers.
   * @deprecated
   * @defaultValue [ChainId.Mainnet, ChainId.Goerli, ChainId.Kovan, ChainId.Rinkeby, ChainId.Ropsten, ChainId.xDai]
   */
  supportedChains?: number[]
  /**
   * List of intended supported chain configs.
   * If a user tries to connect to an unsupported chain an error value will be returned by `useEthers`.
   * Check the full list in {@link https://github.com/TrueFiEng/useDApp/tree/master/packages/core/src/model/chain}
   * @defaultValue DEFAULT_SUPPORTED_CHAINS // [Localhost, Hardhat, Mainnet, Ropsten, Rinkeby, Goerli, Kovan, ...]
   */
  networks?: Chain[]
  /**
   * Default polling interval [ms] for a new block.
   * @defaultValue 15000
   */
  pollingInterval: number

  /**
   * Polling intervals for new blocks on specific chains.
   */
  pollingIntervals?: PollingIntervals

  /**
   * Notifications options.
   * @defaultValue
   * {
   *   checkInterval: 500,
   *   expirationPeriod: 5000,
   * }
   */
  notifications: {
    checkInterval: number
    expirationPeriod: number
  }
  /**
   * Paths to locations in local storage.
   * @defaultValue
   * {
   *   transactionPath: 'transactions'
   * }
   */
  localStorage: {
    transactionPath: string
  }
  /**
   * If set, adds an additional buffer to estimated gas limit before sending a transaction.
   * Useful if a gas limit of a transaction can be different depending on the state of the blockchain.
   * Gas estimation can be not accurate because the state of the blockchain can change between the time of estimation and the time of transaction mining.
   */
  gasLimitBufferPercentage?: number
  /**
   * @deprecated
   * Alias for gasLimitBufferPercentage.
   */
  bufferGasLimitPercentage?: number
  /**
   * Enables reconnecting to last used provider when user revisits the page.
   * @defaultValue true
   */
  autoConnect: boolean
  /**
   * Refresh standard calls each time the n-th block is mined.
   */
  refresh?: number | 'never' | 'everyBlock'
  /**
   * Optional Local storage override for use in environments like React Native
   */
  localStorageOverride?: WindowLocalStorage['localStorage']
  /**
   * Specify configuration of the wallets that can be used in the app
   * @defaultValue
   * {
   *  metamask: new MetamaskConnector(),
   * }
   */
  connectors: {
    [key: string]: Connector
  }
}

/* eslint-disable @typescript-eslint/ban-types  */
type RecursivePartial<Object, Keys extends {}> = {
  [P in keyof Object]?: P extends keyof Keys ? RecursivePartial<Object[P], Keys[P]> : Object[P]
}

/**
 * useDapp configuration.
 */
export type Config = RecursivePartial<
  FullConfig,
  {
    notifications: {}
  }
>
