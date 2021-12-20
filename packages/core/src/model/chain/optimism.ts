import { Chain } from '../../constants'

export const OptimismKovan: Chain = {
  chainId: 69,
  chainName: 'OptimismKovan',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xE71bf4622578c7d1526A88CD3060f03030E99a04',
  getExplorerAddressLink: (address: string) => `https://kovan-optimistic.etherscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://kovan-optimistic.etherscan.io/tx/${transactionHash}`,
}

export const Optimism: Chain = {
  chainId: 10,
  chainName: 'Optimism',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x35A6Cdb2C9AD4a45112df4a04147EB07dFA01aB7',
  getExplorerAddressLink: (address: string) => `https://optimistic.etherscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://optimistic.etherscan.io/tx/${transactionHash}`,
}

export default {
  OptimismKovan,
  Optimism,
}
