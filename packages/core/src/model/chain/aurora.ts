import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const auroraExplorerUrl = 'https://aurorascan.dev'

export const Aurora: Chain = {
  chainId: 1313161554,
  chainName: 'Aurora',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x32b50c286DEFd2932a0247b8bb940b78c063F16c',
  multicall2Address: '0xace58a26b8Db90498eF0330fDC9C2655db0C45E2',
  rpcUrl: 'https://mainnet.aurora.dev',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrl: auroraExplorerUrl,
  getExplorerAddressLink: getAddressLink(auroraExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(auroraExplorerUrl),
}

const auroraTestnetExplorerUrl = 'https://testnet.aurorascan.dev'

export const AuroraTestnet: Chain = {
  chainId: 1313161555,
  chainName: 'Aurora Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x755E730F28A31079711aB588e3568e70A40F3564',
  rpcUrl: 'https://testnet.aurora.dev',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrl: auroraTestnetExplorerUrl,
  getExplorerAddressLink: getAddressLink(auroraTestnetExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(auroraTestnetExplorerUrl),
}

export default {
  Aurora,
  AuroraTestnet,
}
