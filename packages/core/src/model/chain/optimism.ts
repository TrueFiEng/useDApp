import { Chain } from '../../constants'

export const OptimisticKovan: Chain = {
  chainId: 69,
  chainName: 'OptimisticKovan',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xE71bf4622578c7d1526A88CD3060f03030E99a04',
  getExplorerAddressLink: (address: string) => `https://kovan-optimistic.etherscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://kovan-optimistic.etherscan.io/tx/${transactionHash}`,
}

export default {
  OptimisticKovan
}