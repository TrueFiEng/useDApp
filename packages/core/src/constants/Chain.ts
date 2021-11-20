export type Chain = {
  chainId: number
  chainName: string
  isTestChain: boolean
  isLocalChain: boolean
  multicallAddress: string
  getExplorerAddressLink: (address: string) => string
  getExplorerTransactionLink: (address: string) => string
}
