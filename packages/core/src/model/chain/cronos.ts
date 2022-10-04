import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const cronosExplorerUrl = 'https://cronoscan.com'

export const Cronos: Chain = {
  chainId: 25,
  chainName: 'Cronos',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x0fA4d452693F2f45D28c4EC4d20b236C4010dA74',
  rpcUrl: 'https://evm.cronos.org',
  nativeCurrency: {
    name: 'CRO',
    symbol: 'CRO',
    decimals: 18,
  },
  getExplorerAddressLink: getAddressLink(cronosExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(cronosExplorerUrl),
}

const cronosTestnetExplorerUrl = 'https://testnet.cronoscan.com'

export const CronosTestnet: Chain = {
  chainId: 338,
  chainName: 'CronosTestnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x6a8c1ba309136D78245f1F0a14790239b71a9577',
  rpcUrl: 'https://evm-t3.cronos.org',
  nativeCurrency: {
    name: 'tCRO',
    symbol: 'tCRO',
    decimals: 18,
  },
  getExplorerAddressLink: getAddressLink(cronosTestnetExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(cronosTestnetExplorerUrl),
}

export default {
  Cronos,
  CronosTestnet,
}
