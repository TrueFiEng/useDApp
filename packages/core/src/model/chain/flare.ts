import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const flareExplorerUrl = 'https://flare-explorer.flare.network'

export const Flare: Chain = {
  chainId: 14,
  chainName: 'Flare',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
  rpcUrl: 'https://flare-api.flare.network/ext/C/rpc',
  nativeCurrency: {
    name: 'FLR',
    symbol: 'FLR',
    decimals: 18,
  },
  blockExplorerUrl: flareExplorerUrl,
  getExplorerAddressLink: getAddressLink(flareExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(flareExplorerUrl),
}
