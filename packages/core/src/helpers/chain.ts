import { SUPPORT_NETWORKS, ChainId } from '../constants'

export function getExplorerAddressLink(address: string, chainId: ChainId) {
  const networks = SUPPORT_NETWORKS.filter((network) => network.chainId === chainId)
  return networks[0]?.getExplorerAddressLink(address) || ''
}

export function getExplorerTransactionLink(transactionHash: string, chainId: ChainId) {
  const networks = SUPPORT_NETWORKS.filter((network) => network.chainId === chainId)
  return networks[0]?.getExplorerTransactionLink(transactionHash) || ''
}

export function getChainName(chainId: ChainId) {
  const networks = SUPPORT_NETWORKS.filter((network) => network.chainId === chainId)
  return networks[0]?.chainName || ''
}

export const isTestChain = (chainId: ChainId) =>
  SUPPORT_NETWORKS.filter((network) => network.isTestChain)
    .map((network) => network.chainId)
    .includes(chainId)

export const isLocalChain = (chainId: ChainId) =>
  SUPPORT_NETWORKS.filter((network) => network.isLocalChain)
    .map((network) => network.chainId)
    .includes(chainId)
