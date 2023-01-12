import { ReactNode, useCallback, useEffect, useReducer } from 'react'
import { useEthers, useLocalStorage, useConfig } from '../../hooks'
import { useIsMounted } from '../../hooks/useIsMounted'
import { useNotificationsContext } from '../notifications/context'
import { TransactionsContext } from './context'
import { DEFAULT_STORED_TRANSACTIONS, StoredTransaction, UpdatedTransaction } from './model'
import { transactionReducer } from './reducer'

interface Props {
  children: ReactNode
}

export function TransactionProvider({ children }: Props) {
  const { chainId, library } = useEthers()
  const { localStorage } = useConfig()
  const [storage, setStorage] = useLocalStorage(localStorage.transactionPath)
  const [transactions, dispatch] = useReducer(transactionReducer, storage ?? DEFAULT_STORED_TRANSACTIONS)
  const { addNotification } = useNotificationsContext()
  const isMounted = useIsMounted()

  useEffect(() => {
    setStorage(transactions)
  }, [transactions])

  const addTransaction = useCallback(
    (payload: StoredTransaction) => {
      if (!isMounted()) {
        return
      }
      dispatch({
        type: 'ADD_TRANSACTION',
        payload,
      })
      if (payload.receipt) {
        const type = payload.receipt.status === 0 ? 'transactionFailed' : 'transactionSucceed'
        addNotification({
          notification: {
            type,
            submittedAt: Date.now(),
            transaction: payload.transaction,
            receipt: payload.receipt,
            transactionName: payload.transactionName,
          },
          chainId: payload.transaction.chainId,
        })
        return
      }
      addNotification({
        notification: {
          type: 'transactionStarted',
          transaction: payload.transaction,
          submittedAt: payload.submittedAt,
          transactionName: payload.transactionName,
        },
        chainId: payload.transaction.chainId,
      })
    },
    [dispatch]
  )

  const updateTransaction = useCallback(
    (payload: UpdatedTransaction) => {
      if (!isMounted()) {
        return
      }
      dispatch({
        type: 'UPDATE_TRANSACTION',
        payload,
      })
      const type = payload.receipt.status === 0 ? 'transactionFailed' : 'transactionSucceed'
      addNotification({
        notification: {
          type,
          submittedAt: Date.now(),
          transaction: payload.transaction,
          receipt: payload.receipt,
          transactionName: payload.transactionName,
        },
        chainId: payload.transaction.chainId,
      })
    },
    [dispatch]
  )
  useEffect(() => {
    const updateTransactions = async () => {
      if (!chainId || !library) return

      const blockNumber = await library.getBlockNumber()

      const checkTransaction = async (tx: StoredTransaction) => {
        if (tx.receipt || !shouldCheck(blockNumber, tx)) {
          return tx
        }

        try {
          const receipt = await library.getTransactionReceipt(tx.transaction.hash)
          if (receipt) {
            const type = receipt.status === 0 ? 'transactionFailed' : 'transactionSucceed'
            addNotification({
              notification: {
                type,
                submittedAt: Date.now(),
                transaction: tx.transaction,
                receipt,
                transactionName: tx.transactionName,
              },
              chainId,
            })

            return { ...tx, receipt }
          } else {
            return { ...tx, lastCheckedBlockNumber: blockNumber }
          }
        } catch (error) {
          console.error(`failed to check transaction hash: ${tx.transaction.hash}`, error)
        }

        return tx
      }

      const chainTransactions = transactions[chainId] ?? []
      const newTransactions: StoredTransaction[] = []
      for (const tx of chainTransactions) {
        const newTransaction = await checkTransaction(tx)
        newTransactions.push(newTransaction)
      }

      if (isMounted()) {
        dispatch({ type: 'UPDATE_TRANSACTIONS', chainId, transactions: newTransactions })
      }
    }

    void updateTransactions()
  }, [chainId, library])

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction, updateTransaction }} children={children} />
  )
}

function shouldCheck(blockNumber: number, tx: StoredTransaction): boolean {
  if (tx.receipt) {
    return false
  }

  if (!tx.lastCheckedBlockNumber) {
    return true
  }

  const blocksSinceCheck = blockNumber - tx.lastCheckedBlockNumber
  if (blocksSinceCheck < 1) {
    return false
  }

  const minutesPending = (Date.now() - tx.submittedAt) / 1000 / 60
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9
  }

  if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2
  }

  // otherwise every block
  return true
}
