import { Chain } from '../../constants'

export const Cronos: Chain = {
  chainId: 25,
  chainName: 'Cronos',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x0fA4d452693F2f45D28c4EC4d20b236C4010dA74',
  getExplorerAddressLink: (address: string) => `https://cronoscan.com/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://cronoscan.com/tx/${transactionHash}`,
}

export const CronosTestnet: Chain = {
  chainId: 338,
  chainName: 'CronosTestnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x6a8c1ba309136D78245f1F0a14790239b71a9577',
  getExplorerAddressLink: (address: string) => `https://cronos.crypto.org/explorer/testnet3/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://cronos.crypto.org/explorer/testnet3/tx/${transactionHash}`,
}

export default {
  Cronos,
  CronosTestnet,
}
