import { TransactionReceipt, TransactionResponseParams } from 'ethers'

export interface StoredTransaction {
  transaction: TransactionResponseParams
  submittedAt: number
  receipt?: TransactionReceipt
  lastCheckedBlockNumber?: number
  transactionName?: string
  originalTransaction?: TransactionResponseParams
}

export type UpdatedTransaction = Omit<StoredTransaction, 'submittedAt'> & { receipt: TransactionReceipt }

/**
 * @public
 */
export function getStoredTransactionState(transaction: StoredTransaction) {
  if (transaction.receipt) {
    return transaction.receipt.status === 0 ? 'Fail' : 'Success'
  }
  return 'Mining'
}

export type StoredTransactions = {
  [chainId: number]: StoredTransaction[]
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export const DEFAULT_STORED_TRANSACTIONS: StoredTransactions = {}
