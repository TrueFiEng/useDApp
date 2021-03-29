import { createContext, useContext } from 'react'
import { DEFAULT_STORED_TRANSACTIONS, TransactionToSave, StoredTransactions } from './model'

export const TransactionsContext = createContext<{
  transactions: StoredTransactions
  addTransaction: (transaction: TransactionToSave) => void
}>({
  transactions: DEFAULT_STORED_TRANSACTIONS,
  addTransaction: () => undefined,
})

export function useTransactionsContext() {
  return useContext(TransactionsContext)
}
