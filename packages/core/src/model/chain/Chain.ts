export type Chain = {
  chainId: number
  chainName: string
  isTestChain: boolean
  isLocalChain: boolean
  MULTICALL_ADDRESS: string
  getExplorerAddressLink: (address: string) => string
  getExplorerTransactionLink: (address: string) => string
}
