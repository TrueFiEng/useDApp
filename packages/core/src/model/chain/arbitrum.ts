import { Chain } from '../../constants'

export const ArbitrumRinkeby: Chain = {
  chainId: 421611,
  chainName: 'ArbitrumRinkeby',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xd27BEFd29F8Da4E187fDAEf663aEDF7742f9F47F',
  getExplorerAddressLink: (address: string) => `https://testnet.arbiscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://testnet.arbiscan.io/tx/${transactionHash}`,
}

export const Arbitrum: Chain = {
  chainId: 42161,
  chainName: 'Arbitrum',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x8a0bd1773139C6609e861B9ab68082587a3cD581',
  multicall2Address: '0x80c7dd17b01855a6d2347444a0fcc36136a314de',
  getExplorerAddressLink: (address: string) => `https://arbiscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://arbiscan.io/tx/${transactionHash}`,
}

export default {
  ArbitrumRinkeby,
  Arbitrum,
}
