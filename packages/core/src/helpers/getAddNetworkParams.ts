import { Chain } from '../constants'

// https://docs.metamask.io/guide/rpc-api.html#wallet-addethereumchain
// https://docs.metamask.io/guide/rpc-api.html#unrestricted-methods
export const getAddNetworkParams = (chain: Chain) => ({
  chainId: `0x${chain.chainId.toString(16)}`,
  chainName: chain.chainName,
  rpcUrls: [chain.rpcUrl],
  blockExplorerUrls: chain.blockExplorerUrl ? [chain.blockExplorerUrl] : undefined,
  nativeCurrency: chain.nativeCurrency,
})
