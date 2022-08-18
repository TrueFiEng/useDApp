import { Chain } from '../../constants'

export const xDai: Chain = {
  chainId: 100,
  chainName: 'xDai',
  isTestChain: false,
  isLocalChain: false,
  rpcUrl: 'https://rpc.gnosischain.com/',
  multicallAddress: '0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a',
  getExplorerAddressLink: (address: string) => `https://blockscout.com/poa/xdai/address/${address}/transactions`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://blockscout.com/poa/xdai/tx/${transactionHash}/internal-transactions`,
}

// xdai alias
export const Gnosis = {
  ...xDai,
  chainName: 'Gnosis',
}

export default { xDai, Gnosis }
