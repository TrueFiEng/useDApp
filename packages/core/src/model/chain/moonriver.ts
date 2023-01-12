import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const moonriverExplorerUrl = 'https://moonriver.moonscan.io'

export const Moonriver: Chain = {
  chainId: 1285,
  chainName: 'Moonriver',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0xa9177F8d98DAaB74C24715Ba0A81b73654710523',
  rpcUrl: 'https://rpc.api.moonriver.moonbeam.network',
  nativeCurrency: {
    name: 'MOVR',
    symbol: 'MOVR',
    decimals: 18,
  },
  blockExplorerUrl: moonriverExplorerUrl,
  getExplorerAddressLink: getAddressLink(moonriverExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(moonriverExplorerUrl),
}

const moonbaseAlphaExplorerUrl = 'https://moonbase.moonscan.io'

export const MoonbaseAlpha: Chain = {
  chainId: 1287,
  chainName: 'Moonbase Alpha',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x4E2cfca20580747AdBA58cd677A998f8B261Fc21',
  rpcUrl: 'https://rpc.api.moonbase.moonbeam.network',
  nativeCurrency: {
    name: 'DEV',
    symbol: 'DEV',
    decimals: 18,
  },
  blockExplorerUrl: moonbaseAlphaExplorerUrl,
  getExplorerAddressLink: getAddressLink(moonbaseAlphaExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(moonbaseAlphaExplorerUrl),
}

export default { Moonriver }
