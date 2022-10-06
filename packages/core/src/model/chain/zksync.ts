import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const zksyncExplorerUrl = 'https://zksync2-testnet.zkscan.io'

export const ZkSyncTestnet: Chain = {
  chainId: 280,
  chainName: 'zkSync testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x5014a961801de9a52548068bDac853CE337221e7',
  multicall2Address: '0x32Caf123F6f574035f51532E597125062C0Aa8EE',
  rpcUrl: 'https://zksync2-testnet.zksync.dev',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrl: zksyncExplorerUrl,
  getExplorerAddressLink: getAddressLink(zksyncExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(zksyncExplorerUrl),
}
