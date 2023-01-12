/**
 * Represents the chain type.
 *
 * @public
 */
export interface Chain {
  /**
   * The ID of the chain. Every chain has a unique chainId.
   */
  chainId: number
  /**
   * The name of the chain.
   */
  chainName: string
  /**
   * Whether the chain is a testnet, such as Kovan or Ropsten.
   */
  isTestChain: boolean
  /**
   * Whether the chain is a development chain running on localhost.
   */
  isLocalChain: boolean
  /**
   * An address of the Multicall contract on the chain.
   */
  multicallAddress: string
  /**
   * An address of the Multicall2 contract on the chain.
   */
  multicall2Address?: string
  /**
   * The URL of the network's RPC provider, used (required) for adding the network to Metamask
   */
  rpcUrl?: string
  /**
   * The URL of the network's block explorer, used for adding the network to Metamask
   */
  blockExplorerUrl?: string
  /**
   * The network's currency, used for adding the network to Metamask
   */
  nativeCurrency?: {
    name: string
    symbol: string
    decimals: number
  }
  /**
   * A function to construct a link to a blockchain explorer, based on an ethereum address.
   */
  getExplorerAddressLink: (address: string) => string
  /**
   * A function to construct a link to a blockchain explorer, based on a transaction hash.
   */
  getExplorerTransactionLink: (address: string) => string
}
