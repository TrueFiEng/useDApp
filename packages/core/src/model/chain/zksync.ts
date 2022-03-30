import { Chain } from '../../constants'

export const ZkSyncTestnet: Chain = {
  chainId: 280,
  chainName: 'zkSync alpha testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
  getExplorerAddressLink: (address: string) => `https://zksync2-testnet.zkscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://zksync2-testnet.zkscan.io/tx/${transactionHash}`,
}
