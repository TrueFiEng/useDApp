import { DEFAULT_SUPPORTED_CHAINS, ChainId } from '../constants'

export const getChainById = (chainId: ChainId) =>
  DEFAULT_SUPPORTED_CHAINS.find((network) => network.chainId === chainId)

const deprecationWarning = (methodName: string) =>
  console.warn(`${methodName} is deprecated, can call with Chain directly`)

export const getExplorerAddressLink = (address: string, chainId: ChainId): string | '' => {
  deprecationWarning('getExplorerAddressLink')
  return getChainById(chainId)?.getExplorerAddressLink(address) || ''
}

export const getExplorerTransactionLink = (transactionHash: string, chainId: ChainId): string | '' => {
  deprecationWarning('getExplorerTransactionLink')
  return getChainById(chainId)?.getExplorerTransactionLink(transactionHash) || ''
}

export const getChainName = (chainId: ChainId) => {
  deprecationWarning('getChainName')
  return getChainById(chainId)?.chainName || ''
}

export const isTestChain = (chainId: ChainId) => {
  deprecationWarning('isTestChain')
  return getChainById(chainId)?.isTestChain || false
}

export const isLocalChain = (chainId: ChainId) => {
  deprecationWarning('isLocalChain')
  return getChainById(chainId)?.isLocalChain || false
}
