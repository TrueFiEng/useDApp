import { useMemo } from 'react'
import { useTransactionsContext } from '../providers'
import { useEthers } from './useEthers'

export function useTransactions() {
  const { chainId, account } = useEthers()
  const { addTransaction, transactions } = useTransactionsContext()

  const filtered = useMemo(() => {
    if (chainId === undefined || !account) {
      return []
    }
    return (transactions[chainId] ?? []).filter((x) => x.transaction.from === account)
  }, [transactions, chainId, account])

  return {
    transactions: filtered,
    addTransaction,
  }
}
