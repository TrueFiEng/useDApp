import { DEFAULT_SUPPORTED_CHAINS, ChainId } from '../constants'

export const getChainById = (chainId: ChainId) =>
  DEFAULT_SUPPORTED_CHAINS.find((network) => network.chainId === chainId)

export const getExplorerAddressLink = (address: string, chainId: ChainId): string | '' =>
  getChainById(chainId)?.getExplorerAddressLink(address) || ''

export const getExplorerTransactionLink = (transactionHash: string, chainId: ChainId): string | '' =>
  getChainById(chainId)?.getExplorerTransactionLink(transactionHash) || ''

export const getChainName = (chainId: ChainId) => getChainById(chainId)?.chainName || ''

export const isTestChain = (chainId: ChainId) =>
  DEFAULT_SUPPORTED_CHAINS.some((network) => network.isTestChain && network.chainId === chainId)

export const isLocalChain = (chainId: ChainId) =>
  DEFAULT_SUPPORTED_CHAINS.some((network) => network.isLocalChain && network.chainId === chainId)
