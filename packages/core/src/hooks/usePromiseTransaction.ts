import { TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider'
import { useCallback, useState } from 'react'
import { useNotificationsContext, useTransactionsContext } from '../providers'
import { TransactionStatus, TransactionOptions, TransactionState } from '../model'
import { BigNumber, errors, Signer } from 'ethers'

/**
 * @internal
 */
export async function estimateGasLimit(
  transactionRequest: TransactionRequest | undefined,
  signer: Signer | undefined,
  bufferGasLimitPercentage: number
) {
  if (!signer || !transactionRequest) {
    return undefined
  }
  try {
    const estimatedGas = transactionRequest.gasLimit
      ? BigNumber.from(transactionRequest.gasLimit)
      : await signer.estimateGas(transactionRequest)
    return estimatedGas?.mul(bufferGasLimitPercentage + 100).div(100)
  } catch (err: any) {
    console.error(err)
    return undefined
  }
}

const isDroppedAndReplaced = (e: any) =>
  e?.code === errors.TRANSACTION_REPLACED && e?.replacement && (e?.reason === 'repriced' || e?.cancelled === false)

export function usePromiseTransaction(chainId: number | undefined, options?: TransactionOptions) {
  const [state, setState] = useState<TransactionStatus>({ status: 'None' })
  const { addTransaction } = useTransactionsContext()
  const { addNotification } = useNotificationsContext()

  const resetState = useCallback(() => {
    setState({ status: 'None' })
  }, [setState])

  const promiseTransaction = useCallback(
    async (transactionPromise: Promise<TransactionResponse>) => {
      if (!chainId) return
      let transaction: TransactionResponse | undefined = undefined
      try {
        setState({ status: 'PendingSignature', chainId })

        transaction = await transactionPromise

        setState({ transaction, status: 'Mining', chainId })
        addTransaction({
          transaction: {
            ...transaction,
            chainId: chainId,
          },
          submittedAt: Date.now(),
          transactionName: options?.transactionName,
        })
        const receipt = await transaction.wait()
        setState({ receipt, transaction, status: 'Success', chainId })
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

            setState({
              status,
              transaction: e.replacement,
              originalTransaction: transaction,
              receipt: e.receipt,
              errorMessage,
              chainId,
            })
          } else {
            setState({ status: 'Fail', transaction, receipt: e.receipt, errorMessage, chainId })
          }
        } else {
          setState({ status: 'Exception', errorMessage, chainId })
        }
        return undefined
      }
    },
    [chainId, setState, addTransaction, options]
  )

  return { promiseTransaction, state, resetState }
}
