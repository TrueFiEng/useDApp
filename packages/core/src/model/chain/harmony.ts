import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const harmonyExplorerUrl = 'https://blockscout.com/poa/xdai'

export const Harmony: Chain = {
  chainId: 1666600000,
  chainName: 'Harmony',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0xFE4980f62D708c2A84D3929859Ea226340759320',
  rpcUrl: 'https://api.harmony.one',
  nativeCurrency: {
    name: 'ONE',
    symbol: 'ONE',
    decimals: 18,
  },
  blockExplorerUrl: harmonyExplorerUrl,
  getExplorerAddressLink: getAddressLink(harmonyExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(harmonyExplorerUrl),
}

export default { Harmony }
