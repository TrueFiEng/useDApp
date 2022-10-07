import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const bscExplorerUrl = 'https://bscscan.com'

export const BSC: Chain = {
  chainId: 56,
  chainName: 'Smart Chain',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x41263cba59eb80dc200f3e2544eda4ed6a90e76c',
  multicall2Address: '0xc50f4c1e81c873b2204d7eff7069ffec6fbe136d',
  rpcUrl: 'https://bsc-dataseed1.binance.org',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  blockExplorerUrl: bscExplorerUrl,
  getExplorerAddressLink: getAddressLink(bscExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(bscExplorerUrl),
}

const bscTestnetExplorerUrl = 'https://testnet.bscscan.com'

export const BSCTestnet: Chain = {
  chainId: 97,
  chainName: 'Smart Chain Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C',
  rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  nativeCurrency: {
    name: 'tBNB',
    symbol: 'tBNB',
    decimals: 18,
  },
  blockExplorerUrl: bscTestnetExplorerUrl,
  getExplorerAddressLink: getAddressLink(bscTestnetExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(bscTestnetExplorerUrl),
}

export default {
  BSC,
  BSCTestnet,
}
