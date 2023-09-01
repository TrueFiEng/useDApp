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