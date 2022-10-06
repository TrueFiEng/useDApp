import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const velasExplorerUrl = 'https://evmexplorer.velas.com'

export const Velas: Chain = {
  chainId: 106,
  chainName: 'Velas',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x55c77eEba2b891c7f940cE4C3d9Fcd6915c12082',
  multicall2Address: '0x324f25e6eEB13D45DF559B7326d631e34Fd5ceDF',
  rpcUrl: 'https://evmexplorer.velas.com/rpc',
  nativeCurrency: {
    name: 'VLX',
    symbol: 'VLX',
    decimals: 18,
  },
  getExplorerAddressLink: getAddressLink(velasExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(velasExplorerUrl),
}

const velasTestnetExplorerUrl = 'https://evmexplorer.testnet.velas.com'

export const VelasTestnet: Chain = {
  chainId: 111,
  chainName: 'Velas Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x649DEa474f0Ca0FDb276098d1A4c8BA62b4abC83',
  multicall2Address: '0x65f4f071505912dbC9dCCF3a51542374a43D6a5A',
  rpcUrl: 'https://api.testnet.velas.com',
  nativeCurrency: {
    name: 'VLX',
    symbol: 'VLX',
    decimals: 18,
  },
  blockExplorerUrl: velasTestnetExplorerUrl,
  getExplorerAddressLink: getAddressLink(velasTestnetExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(velasTestnetExplorerUrl),
}

export default {
  Velas,
  VelasTestnet,
}
