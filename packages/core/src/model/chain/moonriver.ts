export const Moonriver = {
  chainId: 1285,
  chainName: 'Moonriver',
  isTestChain: false,
  MULTICALL_ADDRESS: '0xa9177F8d98DAaB74C24715Ba0A81b73654710523',
  getExplorerAddressLink: (address: string) =>
    `https://blockscout.moonriver.moonbeam.network/address/${address}/transactions`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://blockscout.moonriver.moonbeam.network/tx/${transactionHash}/internal-transactions`,
}

export default { Moonriver }
