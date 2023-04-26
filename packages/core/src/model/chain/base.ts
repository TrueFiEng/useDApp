import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const baseGoerliUrl = 'https://goerli.basescan.org'

export const BaseGoerli: Chain = {
  chainId: 84531,
  chainName: 'Base Goerli',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x75F59534dd892c1f8a7B172D639FA854D529ada3',
  rpcUrl: 'https://goerli.base.org',
  nativeCurrency: {
    name: 'Goerli Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrl: baseGoerliUrl,
  getExplorerAddressLink: getAddressLink(baseGoerliUrl),
  getExplorerTransactionLink: getTransactionLink(baseGoerliUrl),
}

export default { BaseGoerli }
