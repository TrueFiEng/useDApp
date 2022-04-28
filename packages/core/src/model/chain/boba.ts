import { Chain } from '../../constants'

export const BobaRinkeby: Chain = {
  chainId: 28,
  chainName: 'BobaRinkeby',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x5884497d4fB74CD2D787bD0B4d02D326D6fD925E',
  getExplorerAddressLink: (address: string) => `https://blockexplorer.rinkeby.boba.network/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://blockexplorer.rinkeby.boba.network/tx/${transactionHash}`,
}

export const Boba: Chain = {
  chainId: 288,
  chainName: 'Boba',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0xfff0fAf13fA05B55c996821d4cA9E0541C8fa365',
  getExplorerAddressLink: (address: string) => `https://blockexplorer.boba.network/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://blockexplorer.boba.network/tx/${transactionHash}`,
}

export default {
  BobaRinkeby,
  Boba,
}
