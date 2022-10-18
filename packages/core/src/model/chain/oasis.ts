import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const oasisEmeraldExplorerUrl = 'https://explorer.emerald.oasis.dev'

export const OasisEmerald: Chain = {
  chainId: 42262,
  chainName: 'Oasis Emerald',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0xA1513CE1a147BB84E04cD61d877d598C018a460F',
  rpcUrl: 'https://emerald.oasis.dev',
  nativeCurrency: {
    name: 'ROSE',
    symbol: 'ROSE',
    decimals: 18,
  },
  blockExplorerUrl: oasisEmeraldExplorerUrl,
  getExplorerAddressLink: getAddressLink(oasisEmeraldExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(oasisEmeraldExplorerUrl),
}

const oasisEmeraldTestnetExplorerUrl = 'https://testnet.explorer.emerald.oasis.dev'

export const OasisEmeraldTestnet: Chain = {
  chainId: 42261,
  chainName: 'Oasis Emerald Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xB2929229096d2ee6850c4d3906ef2d1f1330cdc7',
  rpcUrl: 'https://testnet.emerald.oasis.dev',
  nativeCurrency: {
    name: 'ROSE',
    symbol: 'ROSE',
    decimals: 18,
  },
  blockExplorerUrl: oasisEmeraldTestnetExplorerUrl,
  getExplorerAddressLink: getAddressLink(oasisEmeraldTestnetExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(oasisEmeraldTestnetExplorerUrl),
}

const oasisSapphireExplorerUrl = 'https://explorer.sapphire.oasis.dev'

export const OasisSapphireTestnet: Chain = {
  chainId: 23295,
  chainName: 'Oasis Sapphire Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xB2929229096d2ee6850c4d3906ef2d1f1330cdc7',
  rpcUrl: 'https://testnet.emerald.oasis.dev',
  nativeCurrency: {
    name: 'ROSE',
    symbol: 'ROSE',
    decimals: 18,
  },
  blockExplorerUrl: oasisSapphireExplorerUrl,
  getExplorerAddressLink: getAddressLink(oasisSapphireExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(oasisSapphireExplorerUrl),
}

export default { OasisEmerald, OasisEmeraldTestnet, OasisSapphireTestnet }
