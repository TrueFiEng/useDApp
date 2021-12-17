import { Chain } from '../../constants'

export const Optimism: Chain = {
  chainId: 10,
  chainName: 'Optimism',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0xD0E99f15B24F265074747B2A1444eB02b9E30422',
  getExplorerAddressLink: (address: string) => `https://optimistic.etherscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://optimistic.etherscan.io/tx/${transactionHash}`,
}

export const OptimismKovan: Chain = {
  chainId: 69,
  chainName: 'Optimism Kovan',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x52f0469307eFCcc11189F4D272f3c03Da22Db0b3',
  getExplorerAddressLink: (address: string) => `https://kovan-optimistic.etherscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://kovan-optimistic.etherscan.io/tx/${transactionHash}`,
}

export default { Optimism, OptimismKovan }
