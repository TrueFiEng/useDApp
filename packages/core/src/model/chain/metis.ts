import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const stardustExplorerUrl = 'https://stardust-explorer.metis.io'

export const Stardust: Chain = {
  chainId: 588,
  chainName: 'Stardust',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xaF9D4DC0698d8FD9f41387ecb08D9976079B8086',
  // RPC URL source: https://chainlist.org/
  rpcUrl: 'https://stardust.metis.io/?owner=588',
  nativeCurrency: {
    name: 'METIS',
    symbol: 'METIS',
    decimals: 18,
  },
  blockExplorerUrl: stardustExplorerUrl,
  getExplorerAddressLink: getAddressLink(stardustExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(stardustExplorerUrl),
}

const andromedaExplorerUrl = 'https://andromeda-explorer.metis.io'

export const Andromeda: Chain = {
  chainId: 1088,
  chainName: 'Andromeda',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x1a2AFb22B8A90A77a93e80ceA61f89D04e05b796',
  // RPC URL source: https://chainlist.org/
  rpcUrl: 'https://andromeda.metis.io/?owner=1088',
  nativeCurrency: {
    name: 'METIS',
    symbol: 'METIS',
    decimals: 18,
  },
  blockExplorerUrl: andromedaExplorerUrl,
  getExplorerAddressLink: getAddressLink(andromedaExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(andromedaExplorerUrl),
}

export default { Stardust, Andromeda }
