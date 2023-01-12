import { createContext, useContext } from 'react'
import { DEFAULT_STORED_TRANSACTIONS, StoredTransaction, StoredTransactions, UpdatedTransaction } from './model'

export const TransactionsContext = createContext<{
  transactions: StoredTransactions
  addTransaction: (payload: StoredTransaction) => void
  updateTransaction: (payload: UpdatedTransaction) => void
}>({
  transactions: DEFAULT_STORED_TRANSACTIONS,
  addTransaction: () => undefined,
  updateTransaction: () => undefined,
})

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function useTransactionsContext() {
  return useContext(TransactionsContext)
}
