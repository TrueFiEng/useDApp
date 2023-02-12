import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const celoExplorerUrl = 'https://celoscan.io'

export const Celo: Chain = {
  chainId: 42220,
  chainName: 'Celo',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x75F59534dd892c1f8a7B172D639FA854D529ada3',
  rpcUrl: 'https://forno.celo.org',
  nativeCurrency: {
    name: 'CELO',
    symbol: 'CELO',
    decimals: 18,
  },
  blockExplorerUrl: celoExplorerUrl,
  getExplorerAddressLink: getAddressLink(celoExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(celoExplorerUrl),
}

const alfajoresExplorerUrl = 'https://alfajores.celoscan.io'

export const CeloAlfajores: Chain = {
  chainId: 44787,
  chainName: 'CeloAlfajores',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x387ce7960b5DA5381De08Ea4967b13a7c8cAB3f6',
  rpcUrl: 'https://alfajores-forno.celo-testnet.org',
  nativeCurrency: {
    name: 'CELO',
    symbol: 'CELO',
    decimals: 18,
  },
  blockExplorerUrl: alfajoresExplorerUrl,
  getExplorerAddressLink: getAddressLink(alfajoresExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(alfajoresExplorerUrl),
}

export default { Celo, CeloAlfajores }
