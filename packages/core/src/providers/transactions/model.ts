import { TransactionReceipt } from '@ethersproject/providers'
import { ChainId } from '../../constants'

export interface TransactionToSave {
  hash: string
  from: string
  description: string
  chainId: ChainId
}

export interface StoredTransaction {
  from: string
  hash: string
  description: string
  submittedAt: number
  lastCheckedBlockNumber?: number
  receipt?: TransactionReceipt
}

export type StoredTransactions = {
  [T in ChainId]?: StoredTransaction[]
}

export const DEFAULT_STORED_TRANSACTIONS: StoredTransactions = {}
