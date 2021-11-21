import { DEFAULT_SUPPORTED_CHAINS, ChainId } from '../constants'

export const getChainById = (chainId: ChainId) =>
  DEFAULT_SUPPORTED_CHAINS.find((network) => network.chainId === chainId)

export const getExplorerAddressLink = (address: string, chainId: ChainId): string | '' => {
  console.warn('getExplorerAddressLink is deprecated, can call with Chain directly')
  return getChainById(chainId)?.getExplorerAddressLink(address) || ''
}

export const getExplorerTransactionLink = (transactionHash: string, chainId: ChainId): string | '' => {
  console.warn('getExplorerTransactionLink is deprecated, can call with Chain directly')
  return getChainById(chainId)?.getExplorerTransactionLink(transactionHash) || ''
}

export const getChainName = (chainId: ChainId) => {
  console.warn('getChainName is deprecated, can call with Chain directly')
  return getChainById(chainId)?.chainName || ''
}

export const isTestChain = (chainId: ChainId) => {
  console.warn('isTestChain is deprecated, can call with Chain directly')
  return getChainById(chainId)?.isTestChain || false
}

export const isLocalChain = (chainId: ChainId) => {
  console.warn('isLocalChain is deprecated, can call with Chain directly')
  return getChainById(chainId)?.isLocalChain || false
}
