import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const testnetExplorerUrl = 'https://kovan-optimistic.etherscan.io'

export const OptimismKovan: Chain = {
  chainId: 69,
  chainName: 'OptimismKovan',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xE71bf4622578c7d1526A88CD3060f03030E99a04',
  rpcProviderUrl: 'https://kovan.optimism.io',
  blockExplorerUrl: testnetExplorerUrl,
  getExplorerAddressLink: getAddressLink(testnetExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(testnetExplorerUrl),
}

const optimismExplorerUrl = 'https://optimistic.etherscan.io'

export const Optimism: Chain = {
  chainId: 10,
  chainName: 'Optimism',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x35A6Cdb2C9AD4a45112df4a04147EB07dFA01aB7',
  rpcProviderUrl: 'https://mainnet.optimism.io',
  blockExplorerUrl: optimismExplorerUrl,
  getExplorerAddressLink: getAddressLink(optimismExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(optimismExplorerUrl),
}

export default {
  OptimismKovan,
  Optimism,
}
