import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const bobaExplorerUrl = 'https://bobascan.com'

export const Boba: Chain = {
  chainId: 288,
  chainName: 'Boba',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x344696b815742A3E31181207e027e5110e2A0f74',
  rpcUrl: 'https://mainnet.boba.network',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrl: bobaExplorerUrl,
  getExplorerAddressLink: getAddressLink(bobaExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(bobaExplorerUrl),
}

const bobaRinkebyExplorerUrl = 'https://blockexplorer.rinkeby.boba.network'

export const BobaRinkeby: Chain = {
  chainId: 28,
  chainName: 'Boba Rinkeby',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xC8Ad85fF276fbC1aDF627D9dff0AfD8bdc4C3492',
  rpcUrl: 'https://rinkeby.boba.network',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrl: bobaExplorerUrl,
  getExplorerAddressLink: getAddressLink(bobaRinkebyExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(bobaRinkebyExplorerUrl),
}

export default {
  Boba,
  BobaRinkeby,
}
