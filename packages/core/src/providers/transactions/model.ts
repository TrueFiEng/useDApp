import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers'
import { ChainId } from '../../constants'

export type StoredTransactionStatus = 'transactionMining' | 'transactionFailed' | 'transactionSucceed'

export interface StoredTransaction {
  transaction: TransactionResponse
  submittedAt: number
  status: StoredTransactionStatus
  receipt?: TransactionReceipt
  lastCheckedBlockNumber?: number
  transactionName?: string
}

export type StoredTransactions = {
  [T in ChainId]?: StoredTransaction[]
}

export const DEFAULT_STORED_TRANSACTIONS: StoredTransactions = {}
