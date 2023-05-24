import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const mantleExplorerUrl = 'https://explorer.testnet.mantle.xyz'

export const MantleTestnet: Chain = {
  chainId: 5001,
  chainName: 'Mantle Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x7eeFb76E4D201Eb7157c140F39E2992D53F71da7',
  multicall2Address: '0xd875b6E583cba79183be68E0af7cBad053338C95',
  rpcUrl: 'https://rpc.testnet.mantle.xyz',
  nativeCurrency: {
    name: 'Testnet BitDAO',
    symbol: 'BIT',
    decimals: 18,
  },
  blockExplorerUrl: mantleExplorerUrl,
  getExplorerAddressLink: getAddressLink(mantleExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(mantleExplorerUrl),
}

export default { MantleTestnet }
