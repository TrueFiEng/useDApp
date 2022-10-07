import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const polygonExplorerUrl = 'https://polygonscan.com'

export const Polygon: Chain = {
  chainId: 137,
  chainName: 'Polygon',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
  rpcUrl: 'https://polygon-rpc.com',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  blockExplorerUrl: polygonExplorerUrl,
  getExplorerAddressLink: getAddressLink(polygonExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(polygonExplorerUrl),
}

const mumbaiExplorerUrl = 'https://mumbai.polygonscan.com'

export const Mumbai: Chain = {
  chainId: 80001,
  chainName: 'Mumbai',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc',
  rpcUrl: 'https://rpc-mumbai.maticvigil.com',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  blockExplorerUrl: mumbaiExplorerUrl,
  getExplorerAddressLink: getAddressLink(mumbaiExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(mumbaiExplorerUrl),
}

export default { Polygon, Mumbai }
