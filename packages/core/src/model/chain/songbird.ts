import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const songbirdExplorerUrl = 'https://songbird-explorer.flare.network'

export const Songbird: Chain = {
  chainId: 19,
  chainName: 'Songbird',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x60351436cf80A31EA6C3B261C784d3C127dBD6f1',
  rpcUrl: 'https://songbird.towolabs.com/rpc',
  nativeCurrency: {
    name: 'SGB',
    symbol: 'SGB',
    decimals: 18,
  },
  blockExplorerUrl: songbirdExplorerUrl,
  getExplorerAddressLink: getAddressLink(songbirdExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(songbirdExplorerUrl),
}
