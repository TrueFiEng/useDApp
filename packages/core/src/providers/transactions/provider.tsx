import { ReactNode, useCallback, useEffect, useReducer } from 'react'
import { useEthers, useLocalStorage } from '../../hooks'
import { useBlockNumber } from '../blockNumber/context'
import { TransactionsContext } from './context'
import { DEFAULT_STORED_TRANSACTIONS, StoredTransaction, TransactionToSave } from './model'
import { transactionReducer } from './reducer'

interface Props {
  children: ReactNode
}

export function TransactionProvider({ children }: Props) {
  const { chainId, library } = useEthers()
  const blockNumber = useBlockNumber()
  const [storage, setStorage] = useLocalStorage('transactions')
  const [transactions, dispatch] = useReducer(transactionReducer, storage ?? DEFAULT_STORED_TRANSACTIONS)

  useEffect(() => {
    setStorage(transactions)
  }, [transactions])

  const addTransaction = useCallback(
    (transaction: TransactionToSave) => {
      dispatch({
        type: 'TRANSACTION_ADDED',
        chainId: transaction.chainId,
        description: transaction.description,
        from: transaction.from,
        hash: transaction.hash,
        submittedAt: Date.now(),
      })
    },
    [dispatch]
  )

  useEffect(() => {
    const updateTransactions = async () => {
      if (!chainId || !library || !blockNumber) {
        return
      }

      const chainTransactions = transactions[chainId] ?? []
      const filteredTransactions = chainTransactions.filter((tx) => shouldCheck(blockNumber, tx))
      for (const tx of filteredTransactions) {
        try {
          const receipt = await library.getTransactionReceipt(tx.hash)
          if (receipt) {
            dispatch({
              type: 'TRANSACTION_MINED',
              chainId,
              hash: tx.hash,
              receipt,
            })
          } else {
            dispatch({
              type: 'TRANSACTION_CHECKED',
              chainId,
              hash: tx.hash,
              blockNumber,
            })
          }
        } catch (error) {
          console.error(`failed to check transaction hash: ${tx.hash}`, error)
        }
      }
    }

    updateTransactions()
  }, [chainId, library, transactions, blockNumber])

  return <TransactionsContext.Provider value={{ transactions, addTransaction }} children={children} />
}

function shouldCheck(blockNumber: number, tx: StoredTransaction): boolean {
  if (tx.receipt) return false
  if (!tx.lastCheckedBlockNumber) return true
  const blocksSinceCheck = blockNumber - tx.lastCheckedBlockNumber
  if (blocksSinceCheck < 1) return false
  const minutesPending = (Date.now() - tx.submittedAt) / 1000 / 60
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9
  } else if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2
  } else {
    // otherwise every block
    return true
  }
}
