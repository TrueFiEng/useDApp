import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers'
import { ChainId } from '../../constants'

export interface StoredTransaction {
  transaction: TransactionResponse
  submittedAt: number
  receipt?: TransactionReceipt
  lastCheckedBlockNumber?: number
}

export type StoredTransactions = {
  [T in ChainId]?: StoredTransaction[]
}

export const DEFAULT_STORED_TRANSACTIONS: StoredTransactions = {}
