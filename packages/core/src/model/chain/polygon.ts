import { Chain } from './Chain'

export const Polygon: Chain = {
  chainId: 137,
  chainName: 'Polygon',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
  getExplorerAddressLink: (address: string) =>
    `https://explorer-mainnet.maticvigil.com/address/${address}/transactions`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://explorer-mainnet.maticvigil.com/tx/${transactionHash}/internal-transactions`,
}

export const Mumbai: Chain = {
  chainId: 80001,
  chainName: 'Mumbai',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc',
  getExplorerAddressLink: (address: string) => `https://explorer-mumbai.maticvigil.com/address/${address}/transactions`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://explorer-mumbai.maticvigil.com/tx/${transactionHash}/internal-transactions`,
}

export default { Polygon, Mumbai }
