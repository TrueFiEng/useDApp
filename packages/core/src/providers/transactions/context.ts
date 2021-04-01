import { createContext, useContext } from 'react'
import { DEFAULT_STORED_TRANSACTIONS, StoredTransaction, StoredTransactions } from './model'

export const TransactionsContext = createContext<{
  transactions: StoredTransactions
  addTransaction: (payload: StoredTransaction) => void
}>({
  transactions: DEFAULT_STORED_TRANSACTIONS,
  addTransaction: () => undefined,
})

export function useTransactionsContext() {
  return useContext(TransactionsContext)
}
