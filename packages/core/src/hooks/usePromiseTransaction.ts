import { TransactionResponse } from '@ethersproject/abstract-provider'
import { useCallback, useState } from 'react'
import { useNotificationsContext, useTransactionsContext } from '../providers'
import { TransactionStatus, TransactionOptions } from '../../src'
import { TransactionState } from '../model'
import { errors } from 'ethers'

const isDroppedAndReplaced = (e: any) =>
  e?.code === errors.TRANSACTION_REPLACED && e?.replacement && (e?.reason === 'repriced' || e?.cancelled === false)

export function usePromiseTransaction(chainId: number | undefined, options?: TransactionOptions) {
  const [state, setState] = useState<TransactionStatus>({ status: 'None', transactionName: options?.transactionName })
  const { addTransaction } = useTransactionsContext()
  const { addNotification } = useNotificationsContext()

  const resetState = useCallback(() => {
    setState(({ transactionName }) => ({ status: 'None', transactionName }))
  }, [setState])

  const promiseTransaction = useCallback(
    async (transactionPromise: Promise<TransactionResponse>) => {
      if (!chainId) return
      let transaction: TransactionResponse | undefined = undefined
      try {
        setState((prevState) => ({ ...prevState, status: 'PendingSignature' }))

        transaction = await transactionPromise

        setState((prevState) => ({ ...prevState, transaction, status: 'Mining' }))
        addTransaction({
          transaction: {
            ...transaction,
            chainId,
          },
          submittedAt: Date.now(),
          transactionName: options?.transactionName,
        })
        const receipt = await transaction.wait()
        setState((prevState) => ({ ...prevState, status: 'Success' }))
        return receipt
      } catch (e: any) {
        const errorMessage = e.error?.message ?? e.reason ?? e.data?.message ?? e.message
        if (transaction) {
          const droppedAndReplaced = isDroppedAndReplaced(e)

          if (droppedAndReplaced) {
            const status: TransactionState = e.receipt.status === 0 ? 'Fail' : 'Success'
            const type = status === 'Fail' ? 'transactionFailed' : 'transactionSucceed'

            addNotification({
              notification: {
                type,
                submittedAt: Date.now(),
                transaction: e.replacement,
                receipt: e.receipt,
                transactionName: e.replacement?.transactionName,
                originalTransaction: transaction,
              },
              chainId,
            })

            setState((prevState) => ({
              ...prevState,
              status,
              transaction: e.replacement,
              originalTransaction: transaction,
              receipt: e.receipt,
              transactionName: e.replacement?.transactionName,
              errorMessage,
            }))
          } else {
            setState((prevState) => ({ ...prevState, status: 'Fail', transaction, receipt: e.receipt, errorMessage }))
          }
        } else {
          setState((prevState) => ({ ...prevState, status: 'Exception', errorMessage }))
        }
        return undefined
      }
    },
    [chainId, setState, addTransaction, options]
  )

  return { promiseTransaction, state, resetState }
}
