import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const arbitrumRedditscanUrl = 'https://testnet.redditspace.com'

export const ArbitrumRedditTestnet: Chain = {
  chainId: 5391184,
  chainName: 'ArbitrumRedditTestnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x722db82dea58c880d03b87885053f206f1b37136',
  multicall2Address: '0xd4d664d419a6a845c98cc366ae1c4b24592bd5ce',
  rpcUrl: 'https://testnet.redditspace.com/rpc',
  blockExplorerUrl: arbitrumRedditscanUrl,
  getExplorerAddressLink: getAddressLink(arbitrumRedditscanUrl),
  getExplorerTransactionLink: getTransactionLink(arbitrumRedditscanUrl),
}

export default {
  ArbitrumRedditTestnet,
}
