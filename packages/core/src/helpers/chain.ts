import { DEFAULT_SUPPORTED_CHAINS, ChainId } from '../constants'

/**
 * @internal Intended for internal use - use it on your own risk
 */
export const getChainById = (chainId: ChainId) =>
  DEFAULT_SUPPORTED_CHAINS.find((network) => network.chainId === chainId)

const deprecationWarning = (methodName: string) =>
  console.warn(`${methodName} is deprecated, can call with Chain directly`)

/**
 * @public
 * @deprecated
 */
export const getExplorerAddressLink = (address: string, chainId: ChainId): string | '' => {
  deprecationWarning('getExplorerAddressLink')
  return getChainById(chainId)?.getExplorerAddressLink(address) || ''
}

/**
 * @public
 * @deprecated
 */
export const getExplorerTransactionLink = (transactionHash: string, chainId: ChainId): string | '' => {
  deprecationWarning('getExplorerTransactionLink')
  return getChainById(chainId)?.getExplorerTransactionLink(transactionHash) || ''
}

/**
 * @public
 * @deprecated
 */
export const getChainName = (chainId: ChainId) => {
  deprecationWarning('getChainName')
  return getChainById(chainId)?.chainName || ''
}

/**
 * @public
 * @deprecated
 */
export const isTestChain = (chainId: ChainId) => {
  deprecationWarning('isTestChain')
  return getChainById(chainId)?.isTestChain || false
}

/**
 * @public
 * @deprecated
 */
export const isLocalChain = (chainId: ChainId) => {
  deprecationWarning('isLocalChain')
  return getChainById(chainId)?.isLocalChain || false
}
