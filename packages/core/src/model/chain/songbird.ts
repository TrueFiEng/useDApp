export const Songbird = {
  chainId: 19,
  chainName: 'Songbird',
  isTestChain: false,
  isLocalChain: false,
  MULTICALL_ADDRESS: '0x60351436cf80A31EA6C3B261C784d3C127dBD6f1',
  getExplorerAddressLink: (address: string) => `https://songbird-explorer.flare.network/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://songbird-explorer.flare.network/tx/${transactionHash}`,
}
