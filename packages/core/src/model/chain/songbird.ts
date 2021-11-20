import { Chain } from './Chain'

export const Songbird: Chain = {
  chainId: 19,
  chainName: 'Songbird',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x60351436cf80A31EA6C3B261C784d3C127dBD6f1',
  getExplorerAddressLink: (address: string) => `https://songbird-explorer.flare.network/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://songbird-explorer.flare.network/tx/${transactionHash}`,
}
