import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const blastSepoliaTestnetExplorerUrl = 'https://testnet.blastscan.io'

export const BlastSepoliaTestnet: Chain = {
  chainId: 168587773,
  chainName: 'Blast Sepolia Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
  rpcUrl: 'https://sepolia.blast.io',
  nativeCurrency: {
    name: 'SepoliaETH',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrl: blastSepoliaTestnetExplorerUrl,
  getExplorerAddressLink: getAddressLink(blastSepoliaTestnetExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(blastSepoliaTestnetExplorerUrl),
}

export default {
  BlastSepoliaTestnet,
}
