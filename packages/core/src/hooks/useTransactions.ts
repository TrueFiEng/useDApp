import { useMemo } from 'react'
import { QueryParams } from '../constants/type/QueryParams'
import { useTransactionsContext } from '../providers'
import { useEthers } from './useEthers'

/**
 * `useTransactions` hook returns a list `transactions`. This list contains
 * all transactions that were sent using {@link useContractFunction} and {@link useSendTransaction}.
 * Transactions are stored in local storage and the status is rechecked on every new block.
 *
 * Each transaction has following type:
 *
 * ```
 * export interface StoredTransaction {
 *   transaction: TransactionResponse
 *   submittedAt: number
 *   receipt?: TransactionReceipt
 *   lastCheckedBlockNumber?: number
 *   transactionName?: string
 *   originalTransaction?: TransactionResponse
 * }
 * ```
 *
 * @see [Transaction Response](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse)
 * @see [Transaction Receipt](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt)
 * @public
 */
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
