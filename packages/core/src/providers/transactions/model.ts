import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers'

/**
 * @public
 */
export interface StoredTransaction {
  transaction: TransactionResponse
  submittedAt: number
  receipt?: TransactionReceipt
  lastCheckedBlockNumber?: number
  transactionName?: string
  originalTransaction?: TransactionResponse
}

/**
 * @public
 */
export function getStoredTransactionState(transaction: StoredTransaction) {
  if (transaction.receipt) {
    return transaction.receipt.status === 0 ? 'Fail' : 'Success'
  }
  return 'Mining'
}

/**
 * @public
 */
export type StoredTransactions = {
  [chainID: number]: StoredTransaction[]
}

export const DEFAULT_STORED_TRANSACTIONS: StoredTransactions = {}
