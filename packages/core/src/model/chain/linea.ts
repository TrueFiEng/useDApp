import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const lineaExplorerUrlTestnet = 'https://explorer.goerli.linea.build'

export const LineaTestnet: Chain = {
  chainId: 59140,
  chainName: 'Linea Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x9901f3053527a58B8C210B144f53CbeA7b6E23Fb',
  rpcUrl: 'https://rpc.goerli.linea.build',
  nativeCurrency: {
    name: 'Linea Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrl: lineaExplorerUrlTestnet,
  getExplorerAddressLink: getAddressLink(lineaExplorerUrlTestnet),
  getExplorerTransactionLink: getTransactionLink(lineaExplorerUrlTestnet),
}

const lineaExplorerUrl = 'https://lineascan.build/'

export const Linea: Chain = {
  chainId: 59144,
  chainName: 'Linea',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x5D155A04De5bB501f022E44AEd7FF23A6Ff2C1F1',
  rpcUrl: 'https://rpc.linea.build',
  nativeCurrency: {
    name: 'Linea Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrl: lineaExplorerUrl,
  getExplorerAddressLink: getAddressLink(lineaExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(lineaExplorerUrl),
}

export default { LineaTestnet }
