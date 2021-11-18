export const Theta = {
  chainId: 361,
  chainName: 'Theta',
  isTestChain: false,
  MULTICALL_ADDRESS: '0xe2ec58a54f3ab2714eddbae87533793011f1e14e',
  getExplorerAddressLink: (address: string) => `https://explorer.thetatoken.org/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://explorer.thetatoken.org/tx/${transactionHash}`,
}

export const ThetaTestnet = {
  chainId: 365,
  chainName: 'ThetaTestnet',
  isTestChain: true,
  MULTICALL_ADDRESS: '0xf822bf2e728e264c58d7618022addd9cbc780350',
  getExplorerAddressLink: (address: string) => `https://testnet-explorer.thetatoken.org/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://testnet-explorer.thetatoken.org/tx/${transactionHash}`,
}

export default {
  Theta,
  ThetaTestnet,
}
