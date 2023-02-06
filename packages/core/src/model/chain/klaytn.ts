import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const klaytnExplorerUrl = 'https://scope.klaytn.com/'

export const Klaytn: Chain = {
  chainId: 8217,
  chainName: 'klaytn',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0xd11dfc2ab34abd3e1abfba80b99aefbd6255c4b8',
  rpcUrl: 'https://klaytn.blockpi.network/v1/rpc/public	',
  nativeCurrency: {
    name: 'klaytn',
    symbol: 'KLAY',
    decimals: 18,
  },
  blockExplorerUrl: klaytnExplorerUrl,
  getExplorerAddressLink: getAddressLink(klaytnExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(klaytnExplorerUrl),
}

const klaytnTestnetExplorerUrl = 'https://baobab.scope.klaytn.com/'

export const KlaytnTestnet: Chain = {
  chainId: 1001,
  chainName: 'klaytn Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0xd11dfc2ab34abd3e1abfba80b99aefbd6255c4b8',
  rpcUrl: 'https://klaytn-baobab.blockpi.network/v1/rpc/public',
  nativeCurrency: {
    name: 'klaytn Testnet',
    symbol: 'KLAY',
    decimals: 18,
  },
  blockExplorerUrl: klaytnTestnetExplorerUrl,
  getExplorerAddressLink: getAddressLink(klaytnTestnetExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(klaytnTestnetExplorerUrl),
}

export default { Klaytn, KlaytnTestnet }
