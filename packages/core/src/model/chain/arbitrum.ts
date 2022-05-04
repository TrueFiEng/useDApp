import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const arbiscanTestnetUrl = 'https://testnet.arbiscan.io'

export const ArbitrumRinkeby: Chain = {
  chainId: 421611,
  chainName: 'ArbitrumRinkeby',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xd27BEFd29F8Da4E187fDAEf663aEDF7742f9F47F',
  rpcUrl: 'https://rinkeby.arbitrum.io/rpc',
  blockExplorerUrl: arbiscanTestnetUrl,
  getExplorerAddressLink: getAddressLink(arbiscanTestnetUrl),
  getExplorerTransactionLink: getTransactionLink(arbiscanTestnetUrl),
}

const arbiscanUrl = 'https://arbiscan.io'

export const Arbitrum: Chain = {
  chainId: 42161,
  chainName: 'Arbitrum',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x8a0bd1773139C6609e861B9ab68082587a3cD581',
  multicall2Address: '0x80c7dd17b01855a6d2347444a0fcc36136a314de',
  rpcUrl: 'https://arb1.arbitrum.io/rpc',
  blockExplorerUrl: arbiscanUrl,
  getExplorerAddressLink: getAddressLink(arbiscanUrl),
  getExplorerTransactionLink: getTransactionLink(arbiscanUrl),
}

export default {
  ArbitrumRinkeby,
  Arbitrum,
}
