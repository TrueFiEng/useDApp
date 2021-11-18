export const Harmony = {
  chainId: 1666600000,
  chainName: 'Harmony',
  isTestChain: false,
  MULTICALL_ADDRESS: '0xFE4980f62D708c2A84D3929859Ea226340759320',
  getExplorerAddressLink: (address: string) => `https://explorer.harmony.one/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://explorer.harmony.one/tx/${transactionHash}`,
}

export default { Harmony }
