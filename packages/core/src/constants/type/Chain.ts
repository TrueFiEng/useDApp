export type Chain = {
  chainId: number
  chainName: string
  isTestChain: boolean
  isLocalChain: boolean
  multicallAddress: string
  multicall2Address?: string
  getExplorerAddressLink: (address: string) => string
  getExplorerTransactionLink: (address: string) => string
}
