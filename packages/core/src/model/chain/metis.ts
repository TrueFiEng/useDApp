import { Chain } from '../../constants'

export const Stardust: Chain = {
  chainId: 588,
  chainName: 'Stardust',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xaF9D4DC0698d8FD9f41387ecb08D9976079B8086',
  getExplorerAddressLink: (address: string) => `https://stardust-explorer.metis.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://stardust-explorer.metis.io/tx/${transactionHash}`,
}

export const Andromeda: Chain = {
  chainId: 1088,
  chainName: 'Andromeda',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x1a2AFb22B8A90A77a93e80ceA61f89D04e05b796',
  getExplorerAddressLink: (address: string) => `https://andromeda-explorer.metis.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://andromeda-explorer.metis.io/tx/${transactionHash}`,
}

export default { Stardust, Andromeda }
