import { Chain } from '../../constants'

export const Cronos: Chain = {
  chainId: 25,
  chainName: 'Cronos',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0xdAaD0085e5D301Cb5721466e600606AB5158862b',
  getExplorerAddressLink: (address: string) =>
    `https://cronos.crypto.org/explorer/address/${address}/transactions`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://cronos.crypto.org/explorer/tx/${transactionHash}/internal-transactions`,
}

export default { Cronos }
