import type { TransactionReceipt, TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider'
import { useCallback, useEffect, useState } from 'react'
import { useNotificationsContext, useTransactionsContext } from '../providers'
import { TransactionStatus, TransactionOptions, TransactionState } from '../model'
import { BigNumber, Contract, errors, Signer, utils } from 'ethers'
import {
  buildSafeTransaction,
  calculateSafeTransactionHash,
  getSafeTransactionPromise,
  GNOSIS_SAFE_ABI,
  SafeTransaction,
} from '../helpers/gnosisSafeUtils'
import { sleep } from '../helpers/sleep'
import { useEthers } from './useEthers'
import { isGnosisSafe } from '../helpers/gnosisSafeUtils'

interface PromiseTransactionOpts {
  safeTransaction?: Partial<SafeTransaction>
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
  let gnosisSafeContract: Contract | undefined = undefined

  useEffect(() => {
    return () => {
      gnosisSafeContract?.removeAllListeners()
    }
  }, [])

  const resetState = useCallback(() => {
    setState({ status: 'None' })
  }, [setState])

  const promiseTransaction = useCallback(
    async (transactionPromise: Promise<TransactionResponse>, { safeTransaction }: PromiseTransactionOpts = {}) => {
      if (!chainId) return
      let transaction: TransactionResponse | undefined = undefined
      let receipt: TransactionReceipt | undefined = undefined
      try {
        setState({ status: 'PendingSignature', chainId })

        if (await isGnosisSafe(chainId, account ?? '')) {
          if (!library || !account) return
          setState({ status: 'CollectingSignaturePool', chainId })

          let error: any = undefined
          transactionPromise.catch((err: any) => {
            if (err?.message === 'Transaction was rejected') {
              error = err
            }
          })

          gnosisSafeContract = new Contract(account, new utils.Interface(GNOSIS_SAFE_ABI), library)

          const safeTx = buildSafeTransaction({
            to: safeTransaction?.to ?? '',
            value: safeTransaction?.value,
            data: safeTransaction?.data,
            nonce: await gnosisSafeContract.nonce(),
          })

          const safeTxHash = calculateSafeTransactionHash(gnosisSafeContract, safeTx, chainId)

          const onExecutionSuccess = async (txHash: string, _payment: number) => {
            if (txHash === safeTxHash) {
              await sleep(1000)
              const { transactionHash: hash } = await (await getSafeTransactionPromise(chainId, safeTxHash)).json()
              if (!hash) {
                await sleep(2000)
                await onExecutionSuccess(txHash, _payment)
                return
              }

              transaction = await library.getTransaction(hash)
              const receipt = await transaction.wait()

              addNotification({
                notification: {
                  type: 'transactionSucceed',
                  submittedAt: Date.now(),
                  transaction,
                  receipt,
                  transactionName: options?.transactionName,
                },
                chainId,
              })

              setState({ receipt, transaction, status: 'Success', chainId })
              gnosisSafeContract?.removeAllListeners()
            } else {
              await sleep(1000)
              const checkResponse = await (await getSafeTransactionPromise(chainId, txHash)).json()
              const { nonce } = checkResponse
              if (Number(nonce) === Number(safeTx.nonce)) {
                const { transactionHash: hash } = checkResponse
                if (!hash) {
                  await sleep(2000)
                  await onExecutionSuccess(txHash, _payment)
                  return
                }

                transaction = await library.getTransaction(hash)
                receipt = await transaction.wait()

                addNotification({
                  notification: {
                    type: 'transactionSucceed',
                    submittedAt: Date.now(),
                    transaction,
                    receipt,
                    transactionName: options?.transactionName,
                  },
                  chainId,
                })
                const errorMessage = 'On-chain rejection created'
                setState({
                  status: 'Fail',
                  transaction,
                  receipt,
                  errorMessage,
                  chainId,
                })
                gnosisSafeContract?.removeAllListeners()
              }
            }
          }
          gnosisSafeContract.on('ExecutionSuccess', onExecutionSuccess)

          while (!receipt) {
            await sleep(1000)
            if (error) {
              gnosisSafeContract.removeAllListeners()
              throw error
            }
          }
          return receipt
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
