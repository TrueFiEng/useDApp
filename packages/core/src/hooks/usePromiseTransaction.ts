import type { TransactionReceipt, TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider'
import { useCallback, useState } from 'react'
import { useNotificationsContext, useTransactionsContext } from '../providers'
import { TransactionStatus, TransactionOptions, TransactionState } from '../model'
import { BigNumber, Contract, errors, Signer, utils } from 'ethers'
import {
  buildSafeTransaction,
  calculateSafeTransactionHash,
  getSafeTransactionUrl,
  GNOSIS_SAFE_ABI,
  SafeTransaction,
} from '../helpers/gnosisSafeUtils'
import { sleep } from '../helpers/sleep'
import { useEthers } from './useEthers'
import { isGnosisSafe } from '../helpers/gnosisSafeUtils'

interface PromiseTransactionOpts {
  transactionRequest?: Partial<SafeTransaction>
}

/**
 * @internal
 */
export async function estimateTransactionGasLimit(
  transactionRequest: TransactionRequest | undefined,
  signer: Signer | undefined,
  gasLimitBufferPercentage: number
): Promise<BigNumber | undefined> {
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
  const { library, account } = useEthers()

  const resetState = useCallback(() => {
    setState({ status: 'None' })
  }, [setState])

  const promiseTransaction = useCallback(
    async (transactionPromise: Promise<TransactionResponse>, { transactionRequest }: PromiseTransactionOpts = {}) => {
      if (!chainId) return
      let transaction: TransactionResponse | undefined = undefined
      let receipt: TransactionReceipt | undefined = undefined
      setState({ status: 'PendingSignature', chainId })
      try {
        if (await isGnosisSafe(chainId, account ?? '')) {
          if (!library || !account) return
          console.log('THIS IS A SAFE')
          console.log({ transactionRequest })
          setState({ status: 'GnosisSafe', chainId })

          let error: any = undefined
          transactionPromise.catch((err: any) => {
            error = err
          })

          const contract = new Contract(account, new utils.Interface(GNOSIS_SAFE_ABI), library)

          const safeTx = buildSafeTransaction({
            to: transactionRequest?.to?.toString() ?? '',
            nonce: await contract.nonce(),
            value: BigNumber.from(transactionRequest?.value),
          })

          console.log({ nonce: safeTx.nonce.toString() })

          const safeTxHash = calculateSafeTransactionHash(contract, safeTx, chainId)

          console.log({ safeTxHash })

          let response: Response | undefined = undefined
          while (!response?.ok) {
            await sleep(1000)
            if (error) {
              throw error
            }
            response = await fetch(getSafeTransactionUrl(chainId, safeTxHash))
          }

          // trunk-ignore(eslint/@typescript-eslint/no-unused-vars)
          const onExecutionSuccess = async (txHash: string, payment: number) => {
            console.log('onExecutionSuccess', { txHash, safeTxHash })
            if (txHash === safeTxHash) {
              const successResponse = await (await fetch(getSafeTransactionUrl(chainId, safeTxHash))).json()
              const hash = successResponse.transactionHash
              transaction = await library.getTransaction(hash)
              const receipt = await transaction.wait()
              addTransaction({
                transaction: {
                  ...transaction,
                  chainId,
                },
                submittedAt: Date.now(),
                transactionName: options?.transactionName,
              })
              setState({ receipt, transaction, status: 'Success', chainId })
              console.log({ transaction, receipt })
              contract.removeListener('ExecutionSuccess', onExecutionSuccess)
            } else {
              const checkResponse = await (await fetch(getSafeTransactionUrl(chainId, txHash))).json()
              const { nonce } = checkResponse
              console.log({ nonce })
              if (Number(nonce) === Number(safeTx.nonce)) {
                console.log('FAILED')
                setState({ status: 'Fail', chainId })
                contract.removeListener('ExecutionSuccess', onExecutionSuccess)
              }
            }
          }
          contract.on('ExecutionSuccess', onExecutionSuccess)
        } else {
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
          receipt = await transaction.wait()
          setState({ receipt, transaction, status: 'Success', chainId })
          return receipt
        }
      } catch (e: any) {
        console.error(e)
        const parsedErrorCode = parseInt(e.error?.data?.code ?? e.error?.code ?? e.data?.code ?? e.code)
        const errorCode = isNaN(parsedErrorCode) ? undefined : parsedErrorCode
        const errorHash = e?.error?.data?.originalError?.data ?? e?.error?.data
        const errorMessage = e.error?.data?.message ?? e.error?.message ?? e.reason ?? e.data?.message ?? e.message
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
