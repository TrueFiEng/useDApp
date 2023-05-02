import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const scrollAlphaExplorerUrl = 'https://blockscout.scroll.io/'

export const ScrollAlphaTestnet: Chain = {
  chainId: 534353,
  chainName: 'Scroll Alpha Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xA940214bd0387862617E9E6EA3E801DF158692a6',
  multicall2Address: '0xD5A9877C39838676955F487faC80dc9551E4921C',
  rpcUrl: 'https://alpha-rpc.scroll.io/l2',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrl: scrollAlphaExplorerUrl,
  getExplorerAddressLink: getAddressLink(scrollAlphaExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(scrollAlphaExplorerUrl),
}
