import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const astarExplorerUrl = 'https://astar.subscan.io'

export const Astar: Chain = {
  chainId: 592,
  chainName: 'Astar',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0xA129F95CfFe022153a4499f475B537751cd1ceF8',
  multicall2Address: '0x867e9d496F67a5eD0b888120A559DC6430499A7C',
  rpcUrl: 'https://rpc.astar.network:8545',
  nativeCurrency: {
    name: 'ASTR',
    symbol: 'ASTR',
    decimals: 18,
  },
  blockExplorerUrl: astarExplorerUrl,
  getExplorerAddressLink: getAddressLink(astarExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(astarExplorerUrl),
}
