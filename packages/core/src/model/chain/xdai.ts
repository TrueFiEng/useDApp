import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const xDaiExplorerUrl = 'https://blockscout.com/poa/xdai'

export const xDai: Chain = {
  chainId: 100,
  chainName: 'xDai',
  isTestChain: false,
  isLocalChain: false,
  rpcUrl: 'https://rpc.gnosischain.com',
  multicallAddress: '0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a',
  nativeCurrency: {
    name: 'xDAI',
    symbol: 'xDAI',
    decimals: 18,
  },
  blockExplorerUrl: xDaiExplorerUrl,
  getExplorerAddressLink: getAddressLink(xDaiExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(xDaiExplorerUrl),
}

// xdai alias
export const Gnosis = {
  ...xDai,
  chainName: 'Gnosis',
}

export default { xDai, Gnosis }
