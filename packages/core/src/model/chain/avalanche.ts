import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const avax = {
  name: 'Avalanche',
  symbol: 'AVAX',
  decimals: 18,
}

const avalancheExplorerUrl = 'https://snowtrace.io'

export const Avalanche: Chain = {
  chainId: 43114,
  chainName: 'Avalanche',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
  rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
  nativeCurrency: avax,
  blockExplorerUrl: avalancheExplorerUrl,
  getExplorerAddressLink: getAddressLink(avalancheExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(avalancheExplorerUrl),
}

const testExplorerUrl = 'https://testnet.snowtrace.io'

export const AvalancheTestnet: Chain = {
  chainId: 43113,
  chainName: 'Avalanche Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xccc75e78Dce6A20bCCa3a30deB23Cb4D23df993a',
  rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
  nativeCurrency: avax,
  blockExplorerUrl: testExplorerUrl,
  getExplorerAddressLink: getAddressLink(testExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(testExplorerUrl),
}

export default {
  Avalanche,
  AvalancheTestnet,
}
