import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const KromaSepoliaExplorerUrl = 'https://blockscout.sepolia.kroma.network/'

export const KromaSepoliaTestnet: Chain = {
  chainId: 2358,
  chainName: 'Kroma Sepolia Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x62FB84bD50b254c5aFB33453a693a6733Ae40a25',
  rpcUrl: 'https://api.sepolia.kroma.network/',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrl: KromaSepoliaExplorerUrl,
  getExplorerAddressLink: getAddressLink(KromaSepoliaExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(KromaSepoliaExplorerUrl),
}

const KromaExplorerUrl = 'https://blockscout.kroma.network/'

export const KromaMainnet: Chain = {
  chainId: 255,
  chainName: 'Kroma',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0xE3c886498ac54433F2B0E6842FAE421006067751',
  rpcUrl: 'https://api.kroma.network/',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrl: KromaExplorerUrl,
  getExplorerAddressLink: getAddressLink(KromaExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(KromaExplorerUrl),
}
