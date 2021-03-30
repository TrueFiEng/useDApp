import { ReactNode, useCallback, useContext, useEffect, useReducer } from 'react'
import { useEthers, useLocalStorage } from '../../hooks'
import { useBlockNumber } from '../blockNumber/context'
import { useNotificationsContext } from '../notifications/context'
import { TransactionsContext } from './context'
import { DEFAULT_STORED_TRANSACTIONS, TransactionWithChainId } from './model'
import { transactionReducer } from './reducer'

interface Props {
  children: ReactNode
}

export function TransactionProvider({ children }: Props) {
  const { chainId, library } = useEthers()
  const blockNumber = useBlockNumber()
  const [storage, setStorage] = useLocalStorage('transactions')
  const [transactions, dispatch] = useReducer(transactionReducer, storage ?? DEFAULT_STORED_TRANSACTIONS)
  const { addNotification } = useNotificationsContext()

  useEffect(() => {
    setStorage(transactions)
  }, [transactions])

  const addTransaction = useCallback(
    (transaction: TransactionWithChainId) => {
      dispatch({
        type: 'ADD_TRANSACTION',
        transaction,
        submittedAt: Date.now(),
      })
      addNotification({
        type: 'transactionStarted',
        chainId: transaction.chainId,
        transaction: transaction,
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
      const newTransactions = await Promise.all(
        chainTransactions.map(async (tx) => {
          if (tx.receipt) {
            return tx
          }

          try {
            const receipt = await library.getTransactionReceipt(tx.transaction.hash)
            if (receipt) {
              if (receipt.status === 0) {
                addNotification({
                  type: 'transactionFailed',
                  submittedAt: Date.now(),
                  transaction: tx.transaction,
                  receipt,
                  chainId,
                })
              } else {
                addNotification({
                  type: 'transactionSuccedd',
                  submittedAt: Date.now(),
                  transaction: tx.transaction,
                  receipt,
                  chainId,
                })
              }
              return { ...tx, receipt }
            }
          } catch (error) {
            console.error(`failed to check transaction hash: ${tx.transaction.hash}`, error)
          }

          return tx
        })
      )

      dispatch({ type: 'UPDATE_TRANSACTIONS', chainId, transactions: newTransactions })
    }

    updateTransactions()
  }, [chainId, library, blockNumber])

  return <TransactionsContext.Provider value={{ transactions, addTransaction }} children={children} />
}
