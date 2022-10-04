import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const moonbeamExplorerUrl = 'https://moonscan.io'

export const Moonbeam: Chain = {
  chainId: 1284,
  chainName: 'Moonbeam',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x47152C4dCE75C77Bc9E52F5AAa2a20117971C365',
  rpcUrl: 'https://rpc.api.moonbeam.network',
  nativeCurrency: {
    name: 'GLMR',
    symbol: 'GLMR',
    decimals: 18,
  },
  blockExplorerUrl: moonbeamExplorerUrl,
  getExplorerAddressLink: getAddressLink(moonbeamExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(moonbeamExplorerUrl),
}

export default { Moonbeam }
