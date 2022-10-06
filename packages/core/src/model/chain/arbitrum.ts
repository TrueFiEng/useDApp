import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const arbiscanRinkebyUrl = 'https://testnet.arbiscan.io'

export const ArbitrumRinkeby: Chain = {
  chainId: 421611,
  chainName: 'Arbitrum Rinkeby',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xd27BEFd29F8Da4E187fDAEf663aEDF7742f9F47F',
  rpcUrl: 'https://rinkeby.arbitrum.io/rpc',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrl: arbiscanRinkebyUrl,
  getExplorerAddressLink: getAddressLink(arbiscanRinkebyUrl),
  getExplorerTransactionLink: getTransactionLink(arbiscanRinkebyUrl),
}

const arbitrumGoerliExplorerUrl = 'https://goerli-rollup-explorer.arbitrum.io'

export const ArbitrumGoerli: Chain = {
  chainId: 421613,
  chainName: 'Arbitrum Goerli',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x108B25170319f38DbED14cA9716C54E5D1FF4623',
  rpcUrl: 'https://goerli-rollup.arbitrum.io/rpc',
  nativeCurrency: {
    name: 'AGOR',
    symbol: 'AGOR',
    decimals: 18,
  },
  blockExplorerUrl: arbitrumGoerliExplorerUrl,
  getExplorerAddressLink: getAddressLink(arbitrumGoerliExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(arbitrumGoerliExplorerUrl),
}

const arbiscanUrl = 'https://arbiscan.io'

export const Arbitrum: Chain = {
  chainId: 42161,
  chainName: 'Arbitrum One',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x8a0bd1773139C6609e861B9ab68082587a3cD581',
  multicall2Address: '0x80c7dd17b01855a6d2347444a0fcc36136a314de',
  rpcUrl: 'https://arb1.arbitrum.io/rpc',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrl: arbiscanUrl,
  getExplorerAddressLink: getAddressLink(arbiscanUrl),
  getExplorerTransactionLink: getTransactionLink(arbiscanUrl),
}

export default {
  ArbitrumRinkeby,
  Arbitrum,
}
