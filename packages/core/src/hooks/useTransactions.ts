import { useMemo } from 'react'
import { useTransactionsContext } from '../providers'
import { useEthers } from './useEthers'
import { ChainId } from '../constants'

export function useTransactions(_chainId?: ChainId) {
  const { chainId: defaultChainId, account } = useEthers()
  const { addTransaction, transactions } = useTransactionsContext()

  const chainId = useMemo(() => _chainId ?? defaultChainId, [_chainId, defaultChainId])

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
