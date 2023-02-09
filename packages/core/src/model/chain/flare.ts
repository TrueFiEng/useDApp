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

const FlareCostonTestnetExplorerUrl = 'https://coston-explorer.flare.network'

export const FlareCostonTestnet: Chain = {
  chainId: 16,
  chainName: 'Flare Testnet Coston',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xF7aB82e5253F65496e21dF0dacfA6D5e765b4874',
  rpcUrl: 'https://coston-api.flare.network/ext/bc/C/rpc',
  nativeCurrency: {
    name: 'Flare Coston',
    symbol: 'CFLR',
    decimals: 18,
  },
  blockExplorerUrl: FlareCostonTestnetExplorerUrl,
  getExplorerAddressLink: getAddressLink(FlareCostonTestnetExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(FlareCostonTestnetExplorerUrl),
}

const FlareCoston2TestnetExplorerUrl = 'https://coston2-explorer.flare.network'

export const FlareCoston2Testnet: Chain = {
  chainId: 114,
  chainName: 'Flare Testnet Coston2',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
  rpcUrl: 'https://coston2-api.flare.network/ext/bc/C/rpc',
  nativeCurrency: {
    name: 'Flare Coston2',
    symbol: 'C2FLR',
    decimals: 18,
  },
  blockExplorerUrl: FlareCoston2TestnetExplorerUrl,
  getExplorerAddressLink: getAddressLink(FlareCoston2TestnetExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(FlareCoston2TestnetExplorerUrl),
}

export default { Flare, FlareCostonTestnet, FlareCoston2Testnet }
