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

export default {
  Boba
}
