import { ReactNode, useCallback, useEffect, useReducer } from 'react'
import { useEthers, useLocalStorage } from '../../hooks'
import { useBlockNumber } from '../blockNumber/context'
import { TransactionsContext } from './context'
import { DEFAULT_STORED_TRANSACTIONS, TransactionToSave } from './model'
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
      const newTransactions = await Promise.all(
        chainTransactions.map(async (tx) => {
          if (tx.receipt) {
            return tx
          }

          try {
            const receipt = await library.getTransactionReceipt(tx.hash)
            if (receipt) {
              return { ...tx, receipt }
            }
          } catch (error) {
            console.error(`failed to check transaction hash: ${tx.hash}`, error)
          }

          return tx
        })
      )

      dispatch({ type: 'TRANSACTIONS_UPDATE', chainId, transactions: newTransactions })
    }

    updateTransactions()
  }, [chainId, library, blockNumber])

  return <TransactionsContext.Provider value={{ transactions, addTransaction }} children={children} />
}
