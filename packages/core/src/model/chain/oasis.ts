import { Chain } from '../../constants'

export const OasisEmerald: Chain = {
  chainId: 42262,
  chainName: 'OasisEmerald',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0xA1513CE1a147BB84E04cD61d877d598C018a460F',
  getExplorerAddressLink: (address: string) => `https://explorer.emerald.oasis.dev/address/${address}/transactions`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://explorer.emerald.oasis.dev/tx/${transactionHash}/internal-transactions`,
}

export const OasisEmeraldTestnet: Chain = {
  chainId: 42261,
  chainName: 'OasisEmeraldTestnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xB2929229096d2ee6850c4d3906ef2d1f1330cdc7',
  getExplorerAddressLink: (address: string) => `https://testnet.explorer.emerald.oasis.dev/address/${address}/transactions`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://testnet.explorer.emerald.oasis.dev/tx/${transactionHash}/internal-transactions`,
}

export default { OasisEmerald, OasisEmeraldTestnet }
