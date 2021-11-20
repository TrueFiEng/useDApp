import { Chain } from './Chain'

export const Moonriver: Chain = {
  chainId: 1285,
  chainName: 'Moonriver',
  isTestChain: false,
  isLocalChain: false,
  MULTICALL_ADDRESS: '0xa9177F8d98DAaB74C24715Ba0A81b73654710523',
  getExplorerAddressLink: (address: string) =>
    `https://blockscout.moonriver.moonbeam.network/address/${address}/transactions`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://blockscout.moonriver.moonbeam.network/tx/${transactionHash}/internal-transactions`,
}

export const MoonbaseAlpha: Chain = {
  chainId: 1287,
  chainName: 'Moonbase Alpha',
  isTestChain: true,
  isLocalChain: false,
  MULTICALL_ADDRESS: '0x4E2cfca20580747AdBA58cd677A998f8B261Fc21',
  getExplorerAddressLink: (address: string) => `https://moonbase.moonscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://moonbase.moonscan.io/tx/${transactionHash}`,
}

export default { Moonriver }
