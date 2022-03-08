import { useMemo } from 'react'
import { useTransactionsContext } from '../providers'
import { useEthers } from './useEthers'
import { QueryParams } from './useContractCall'

export function useTransactions(queryParams: QueryParams = {}) {
  const { chainId: defaultChainId, account } = useEthers()
  const { addTransaction, transactions } = useTransactionsContext()
  const { chainId: _chainId } = queryParams

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
