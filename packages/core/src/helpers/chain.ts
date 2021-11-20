import { DEFAULT_SUPPORTED_CHAINS, ChainId } from '../constants'

export function getExplorerAddressLink(address: string, chainId: ChainId) {
  const networks = DEFAULT_SUPPORTED_CHAINS.filter((network) => network.chainId === chainId)
  return networks[0]?.getExplorerAddressLink(address) || ''
}

export function getExplorerTransactionLink(transactionHash: string, chainId: ChainId) {
  const networks = DEFAULT_SUPPORTED_CHAINS.filter((network) => network.chainId === chainId)
  return networks[0]?.getExplorerTransactionLink(transactionHash) || ''
}

export function getChainName(chainId: ChainId) {
  const network = DEFAULT_SUPPORTED_CHAINS.find((network) => network.chainId === chainId)
  return network?.chainName || ''
}

export const isTestChain = (chainId: ChainId) =>
  DEFAULT_SUPPORTED_CHAINS.some((network) => network.isTestChain && network.chainId === chainId)

export const isLocalChain = (chainId: ChainId) =>
  DEFAULT_SUPPORTED_CHAINS.some((network) => network.isLocalChain && network.chainId === chainId)
