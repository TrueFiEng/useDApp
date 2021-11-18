export const Fantom = {
  chainId: 250,
  chainName: 'Fantom',
  isTestChain: false,
  MULTICALL_ADDRESS: '0xdc85396592f0F466224390771C861EE3957a3ff4',
  getExplorerAddressLink: (address: string) => `https://ftmscan.com/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://ftmscan.com/tx/${transactionHash}`,
}

export default { Fantom }
