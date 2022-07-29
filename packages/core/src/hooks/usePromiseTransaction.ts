import type { TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider'
import { useCallback, useState } from 'react'
import { useNotificationsContext, useTransactionsContext } from '../providers'
import { TransactionStatus, TransactionOptions, TransactionState } from '../model'
import { BigNumber, Contract, errors, Signer } from 'ethers'

/**
 * @internal
 */
export async function estimateTransactionGasLimit(
  transactionRequest: TransactionRequest | undefined,
  signer: Signer | undefined,
  gasLimitBufferPercentage: number
) {
  if (!signer || !transactionRequest) {
    return undefined
  }
  try {
    const estimatedGas = transactionRequest.gasLimit
      ? BigNumber.from(transactionRequest.gasLimit)
      : await signer.estimateGas(transactionRequest)
    return estimatedGas?.mul(gasLimitBufferPercentage + 100).div(100)
  } catch (err: any) {
    console.error(err)
    return undefined
  }
}

/**
 * @internal
 */
export async function estimateContractFunctionGasLimit(
  contractWithSigner: Contract,
  functionName: string,
  args: any[],
  gasLimitBufferPercentage: number
): Promise<BigNumber | undefined> {
  try {
    const estimatedGas = await contractWithSigner.estimateGas[functionName](...args)
    const gasLimit = estimatedGas?.mul(gasLimitBufferPercentage + 100).div(100)
    return gasLimit
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
        const parsedErrorCode = parseInt(e.error?.data?.code ?? e.error?.code ?? e.data?.code ?? e.code)
        const errorCode = isNaN(parsedErrorCode) ? undefined : parsedErrorCode
        const errorHash = e?.error?.data?.originalError?.data ?? e?.error?.data
        const errorMessage = e.error?.data?.message ?? e.error?.message ?? e.reason ?? e.data?.message ?? e.message

        // If the error was SomeCustomError(), we can get the args...
        // if (e.Code === utils.Logger.errors.CALL_EXCEPTION) {
        // if (e.errorName === "SomeCustomError") {
        // These are both the same; keyword vs positional.
        //   Logger.log(e.errorArgs.value, e.errorArgs[1]);
        // [e.errorName, e.errorArgs]
        // }
        // }
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
              errorCode,
              errorHash,
              chainId,
            })
          } else {
            setState({ status: 'Fail', transaction, receipt: e.receipt, errorMessage, errorCode, errorHash, chainId })
          }
        } else {
          setState({ status: 'Exception', errorMessage, errorCode, errorHash, chainId })
        }
        return undefined
      }
    },
    [chainId, setState, addTransaction, options]
  )

  return { promiseTransaction, state, resetState }
}
