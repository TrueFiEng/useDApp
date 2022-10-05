import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const testnetExplorerUrl = 'https://kovan-optimistic.etherscan.io'

export const OptimismKovan: Chain = {
  chainId: 69,
  chainName: 'Optimism Kovan',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xE71bf4622578c7d1526A88CD3060f03030E99a04',
  rpcUrl: 'https://kovan.optimism.io',
  nativeCurrency: {
    name: 'Kovan Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrl: testnetExplorerUrl,
  getExplorerAddressLink: getAddressLink(testnetExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(testnetExplorerUrl),
}

const testnetGoerliExplorerUrl = 'https://blockscout.com/optimism/goerli'

export const OptimismGoerli: Chain = {
  chainId: 420,
  chainName: 'Optimism Goerli',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xC8315CC7DCDF57476a8a1D184505845d52711024',
  rpcUrl: 'https://goerli.optimism.io',
  nativeCurrency: {
    name: 'Goerli Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrl: testnetGoerliExplorerUrl,
  getExplorerAddressLink: getAddressLink(testnetGoerliExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(testnetGoerliExplorerUrl),
}

const optimismExplorerUrl = 'https://optimistic.etherscan.io'

export const Optimism: Chain = {
  chainId: 10,
  chainName: 'Optimism',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x35A6Cdb2C9AD4a45112df4a04147EB07dFA01aB7',
  rpcUrl: 'https://mainnet.optimism.io',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrl: optimismExplorerUrl,
  getExplorerAddressLink: getAddressLink(optimismExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(optimismExplorerUrl),
}

export default {
  OptimismKovan,
  OptimismGoerli,
  Optimism,
}
