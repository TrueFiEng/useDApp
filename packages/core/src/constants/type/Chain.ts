export type Chain = {
  /**
   * The ID of the chain. Every chain has a unique chainID.
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
   * A function to construct a link to a blockchain explorer, based on an ethereum address.
   */ 
  getExplorerAddressLink: (address: string) => string
  /**
   * A function to construct a link to a blockchain explorer, based on a transaction hash.
   */
  getExplorerTransactionLink: (address: string) => string
}
