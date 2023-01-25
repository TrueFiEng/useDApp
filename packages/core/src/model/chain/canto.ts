import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const cantoExplorerUrl = 'https://evm.explorer.canto.io'

export const Canto: Chain = {
  chainId: 7700,
  chainName: 'Canto',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x210b88d5Ad4BEbc8FAC4383cC7F84Cd4F03d18c6',
  multicall2Address: '0x637490E68AA50Ea810688a52D7464E10c25A77c1',
  rpcUrl: 'https://canto.slingshot.finance',
  nativeCurrency: {
    name: 'Canto',
    symbol: 'CANTO',
    decimals: 18,
  },
  blockExplorerUrl: cantoExplorerUrl,
  getExplorerAddressLink: getAddressLink(cantoExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(cantoExplorerUrl),
}

const CantoTestnetExplorerUrl = 'https://explorer.plexnode.wtf'

export const CantoTestnet: Chain = {
  chainId: 740,
  chainName: 'Canto Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x121817438FC9b31ed4D6C4ED22eCde15af261f75',
  multicall2Address: '0xd546F2aaB14eA4d4Dc083795b3e94D0C471A272f',
  rpcUrl: 'https://eth.plexnode.wtf',
  nativeCurrency: {
    name: 'Canto',
    symbol: 'aCANTO',
    decimals: 18,
  },
  blockExplorerUrl: CantoTestnetExplorerUrl,
  getExplorerAddressLink: getAddressLink(CantoTestnetExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(CantoTestnetExplorerUrl),
}

export default { Canto, CantoTestnet }
