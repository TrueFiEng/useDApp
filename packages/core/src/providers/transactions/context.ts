import { createContext, useContext } from 'react'
import { DEFAULT_STORED_TRANSACTIONS, StoredTransaction, StoredTransactions } from './model'

export const TransactionsContext = createContext<{
  transactions: StoredTransactions
  addTransaction: (payload: StoredTransaction) => void
}>({
  transactions: DEFAULT_STORED_TRANSACTIONS,
  addTransaction: () => undefined,
})

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function useTransactionsContext() {
  return useContext(TransactionsContext)
}
