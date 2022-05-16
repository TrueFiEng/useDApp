import { Chain } from '../../constants'

export const Astar: Chain = {
  chainId: 592,
  chainName: 'Astar',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0xA129F95CfFe022153a4499f475B537751cd1ceF8',
  multicall2Address: '0x867e9d496F67a5eD0b888120A559DC6430499A7C',
  getExplorerAddressLink: (address: string) => `https://blockscout.com/astar/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://blockscout.com/astar/tx/${transactionHash}`,
}
