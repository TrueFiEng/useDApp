import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers'
import { ChainId } from '../../constants'

export interface StoredTransaction {
  transaction: TransactionResponse
  submittedAt: number
  receipt?: TransactionReceipt
  lastCheckedBlockNumber?: number
  transactionName?: string
}

export function getStoredTransactionState(transaction: StoredTransaction) {
  if (transaction.receipt) {
    return transaction?.receipt.status === 0 ? 'Fail' : 'Success'
  }
  return 'Mining'
}

export type StoredTransactions = {
  [T in ChainId]?: StoredTransaction[]
}

export const DEFAULT_STORED_TRANSACTIONS: StoredTransactions = {}
