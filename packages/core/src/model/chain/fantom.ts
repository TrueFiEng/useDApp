import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const fantomExplorerUrl = 'https://ftmscan.com'

export const Fantom: Chain = {
  chainId: 250,
  chainName: 'Fantom',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0xdc85396592f0F466224390771C861EE3957a3ff4',
  rpcUrl: 'https://rpc.ftm.tools',
  nativeCurrency: {
    name: 'Fantom',
    symbol: 'FTM',
    decimals: 18,
  },
  getExplorerAddressLink: getAddressLink(fantomExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(fantomExplorerUrl),
}

const fantomTestnetExplorerUrl = 'https://testnet.ftmscan.com'

export const FantomTestnet: Chain = {
  chainId: 4002,
  chainName: 'Fantom Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xA01917aF773b703717C25C483a619e9218343531',
  rpcUrl: 'https://rpc.testnet.fantom.network',
  nativeCurrency: {
    name: 'Fantom',
    symbol: 'FTM',
    decimals: 18,
  },
  blockExplorerUrl: fantomTestnetExplorerUrl,
  getExplorerAddressLink: getAddressLink(fantomTestnetExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(fantomTestnetExplorerUrl),
}

export default { Fantom, FantomTestnet }
