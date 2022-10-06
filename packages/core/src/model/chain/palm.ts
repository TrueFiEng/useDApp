import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const palmExplorerUrl = 'https://explorer.palm.io'

export const Palm: Chain = {
  chainId: 11297108109,
  chainName: 'Palm',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x99a73dfE34578348fb81BD078201C0BA84E9c840',
  // RPC URL source: https://chainlist.org/
  rpcUrl: 'https://palm-mainnet.infura.io/v3/3a961d6501e54add9a41aa53f15de99b',
  nativeCurrency: {
    name: 'PALM',
    symbol: 'PALM',
    decimals: 18,
  },
  blockExplorerUrl: palmExplorerUrl,
  getExplorerAddressLink: getAddressLink(palmExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(palmExplorerUrl),
}

const palmTestnetExplorerUrl = 'https://explorer.palm-uat.xyz'

export const PalmTestnet: Chain = {
  chainId: 11297108099,
  chainName: 'Palm Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x99a73dfE34578348fb81BD078201C0BA84E9c840',
  rpcUrl: 'https://palm-testnet.public.blastapi.io',
  nativeCurrency: {
    name: 'PALM',
    symbol: 'PALM',
    decimals: 18,
  },
  blockExplorerUrl: palmTestnetExplorerUrl,
  getExplorerAddressLink: getAddressLink(palmTestnetExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(palmTestnetExplorerUrl),
}

export default { Palm, PalmTestnet }
