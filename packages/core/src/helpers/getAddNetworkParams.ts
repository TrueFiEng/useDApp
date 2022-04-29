import { Chain } from '../constants'

export const getAddNetworkParams = (chain: Chain) => ({
  chainId: `0x${chain.chainId.toString(16)}`,
  chainName: chain.chainName,
  rpcUrls: [chain.rpcUrl],
  blockExplorerUrls: [chain.blockExplorerUrl],
})
