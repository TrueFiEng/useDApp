import { Chain } from '../../constants'

export const Boba: Chain = {
  chainId: 288,
  chainName: 'Boba',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x344696b815742A3E31181207e027e5110e2A0f74',
  getExplorerAddressLink: (address: string) => `https://blockexplorer.boba.network/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://blockexplorer.boba.network/tx/${transactionHash}`,
}

export const BobaRinkeby: Chain = {
  chainId: 28,
  chainName: 'BobaRinkeby',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xC8Ad85fF276fbC1aDF627D9dff0AfD8bdc4C3492',
  getExplorerAddressLink: (address: string) => `https://blockexplorer.rinkeby.boba.network/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://blockexplorer.rinkeby.boba.network/tx/${transactionHash}`,
}

export default {
  Boba,
  BobaRinkeby,
}
