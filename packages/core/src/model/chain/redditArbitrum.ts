import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const testnetRedditscanUrl = 'https://testnet.redditspace.com'

export const RedditTestnet: Chain = {
  chainId: 5391184,
  chainName: 'RedditTestnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xFf79F208541DdF9dA6632dD851a269BbfA97d9aD',
  multicall2Address: '',
  rpcUrl: 'https://testnet.redditspace.com/rpc',
  blockExplorerUrl: testnetRedditscanUrl,
  getExplorerAddressLink: getAddressLink(testnetRedditscanUrl),
  getExplorerTransactionLink: getTransactionLink(testnetRedditscanUrl),
}

export default {
    RedditTestnet
}