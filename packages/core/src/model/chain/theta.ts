import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const thetaExplorerUrl = 'https://explorer.thetatoken.org'

export const Theta: Chain = {
  chainId: 361,
  chainName: 'Theta',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0xe2ec58a54f3ab2714eddbae87533793011f1e14e',
  rpcUrl: 'https://eth-rpc-api.thetatoken.org/rpc',
  nativeCurrency: {
    name: 'TFUEL',
    symbol: 'TFUEL',
    decimals: 18,
  },
  blockExplorerUrl: thetaExplorerUrl,
  getExplorerAddressLink: getAddressLink(thetaExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(thetaExplorerUrl),
}

const thetaTestnetExplorerUrl = 'https://testnet-explorer.thetatoken.org'

export const ThetaTestnet: Chain = {
  chainId: 365,
  chainName: 'Theta Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xf822bf2e728e264c58d7618022addd9cbc780350',
  rpcUrl: 'https://eth-rpc-api-testnet.thetatoken.org/rpc',
  nativeCurrency: {
    name: 'TFUEL',
    symbol: 'TFUEL',
    decimals: 18,
  },
  blockExplorerUrl: thetaTestnetExplorerUrl,
  getExplorerAddressLink: getAddressLink(thetaTestnetExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(thetaTestnetExplorerUrl),
}

export default {
  Theta,
  ThetaTestnet,
}
