import { Chain } from '../../constants'

export const Avalanche: Chain = {
  chainId: 43114,
  chainName: 'Avalanche',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
  getExplorerAddressLink: (address: string) => `https://snowtrace.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://snowtrace.io/tx/${transactionHash}`,
}

export const AvalancheTestnet: Chain = {
  chainId: 43113,
  chainName: 'AvalancheTestnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xccc75e78Dce6A20bCCa3a30deB23Cb4D23df993a',
  getExplorerAddressLink: (address: string) => `https://testnet.snowtrace.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://testnet.snowtrace.io/tx/${transactionHash}`,
}

export default { 
  Avalanche,
  AvalancheTestnet
}
