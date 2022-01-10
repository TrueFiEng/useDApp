import { Chain } from '../../constants'

export const Polygon: Chain = {
  chainId: 137,
  chainName: 'Polygon',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
  getExplorerAddressLink: (address: string) =>
    `https://polygonscan.com/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://polygonscan.com/tx/${transactionHash}`,
}

export const Mumbai: Chain = {
  chainId: 80001,
  chainName: 'Mumbai',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc',
  getExplorerAddressLink: (address: string) => `https://mumbai.polygonscan.com/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://mumbai.polygonscan.com/tx/${transactionHash}`,
}

export default { Polygon, Mumbai }
