import type { TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider'
import { useCallback, useState } from 'react'
import { useNotificationsContext, useTransactionsContext } from '../providers'
import { TransactionStatus, TransactionOptions, TransactionState } from '../model'
import { BigNumber, Contract, errors, Signer } from 'ethers'
import { buildSafeTransaction, getLatestNonce, SafeTransaction } from '../helpers/gnosisSafeUtils'
import { useEthers } from './useEthers'
import { waitForSafeTransaction } from '../helpers/gnosisSafeUtils'
import { JsonRpcProvider, FallbackProvider } from '@ethersproject/providers'
import { useGnosisSafeContract } from './useGnosisSafeContract'

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

/**
 * @internal
 */
async function isNonContractWallet(
  library: JsonRpcProvider | FallbackProvider | undefined,
  address: string | undefined
) {
  if (!library || !address) {
    return true
  }
  const code = await library.getCode(address)
  return code === '0x'
}

const isDroppedAndReplaced = (e: any) =>
  e?.code === errors.TRANSACTION_REPLACED && e?.replacement && (e?.reason === 'repriced' || e?.cancelled === false)

export function usePromiseTransaction(chainId: number | undefined, options?: TransactionOptions) {
  const [state, setState] = useState<TransactionStatus>({ status: 'None', transactionName: options?.transactionName })
  const { addTransaction, updateTransaction } = useTransactionsContext()
  const { addNotification } = useNotificationsContext()
  const { library, account } = useEthers()
  const gnosisSafe = useGnosisSafeContract(account, library)

  const resetState = useCallback(() => {
    setState(({ transactionName }) => ({ status: 'None', transactionName }))
  }, [setState])

  const promiseTransaction = useCallback(
    async (
      transactionPromise: Promise<TransactionResponse>,
      { safeTransaction }: PromiseTransactionOpts = {},
      transactionRequest?: TransactionRequest
    ) => {
      const handleNonContractWallet = async (transaction: TransactionResponse) => {
        if (!chainId) return

        setState(({ transactionName }) => ({ transactionName, transaction, status: 'Mining' }))
        addTransaction({
          transaction: {
            ...transaction,
            chainId,
          },
          submittedAt: Date.now(),
          transactionName: options?.transactionName,
        })
        const receipt = await transaction.wait()
        updateTransaction({
          transaction: {
            ...transaction,
            chainId: chainId,
          },
          receipt,
          transactionName: options?.transactionName,
        })
        setState({
          receipt,
          transaction,
          status: 'Success',
          chainId,
          transactionName: options?.transactionName,
        })
        return { transaction, receipt }
      }

      const handleContractWallet = async (
        transactionPromise: Promise<TransactionResponse>,
        { safeTransaction }: PromiseTransactionOpts = {}
      ) => {
        if (!chainId || !library || !account) return
        setState({ status: 'CollectingSignaturePool', chainId, transactionName: options?.transactionName })

        const gnosisSafeContract = gnosisSafe.get()
        if (!gnosisSafeContract) {
          throw new Error("Couldn't create Gnosis Safe contract instance")
        }

        const latestNonce = await getLatestNonce(chainId, account)

        const safeTx = buildSafeTransaction({
          to: safeTransaction?.to ?? '',
          value: safeTransaction?.value,
          data: safeTransaction?.data,
          safeTxGas: safeTransaction?.safeTxGas,
          nonce: latestNonce ? latestNonce + 1 : await gnosisSafeContract.nonce(),
        })

        const { transaction, receipt, rejected } = await waitForSafeTransaction(
          transactionPromise,
          gnosisSafeContract,
          chainId,
          safeTx
        )

        if (rejected) {
          const errorMessage = 'On-chain rejection created'
          addTransaction({
            transaction: {
              ...transaction,
              chainId: chainId,
            },
            receipt,
            submittedAt: Date.now(),
            transactionName: options?.transactionName,
          })
          setState({
            status: 'Fail',
            transaction,
            receipt,
            errorMessage,
            chainId,
            transactionName: options?.transactionName,
          })
        } else {
          addTransaction({
            transaction: {
              ...transaction,
              chainId: chainId,
            },
            receipt,
            submittedAt: Date.now(),
            transactionName: options?.transactionName,
          })
          setState({
            receipt,
            transaction,
            status: 'Success',
            chainId,
            transactionName: options?.transactionName,
          })
        }
        return { transaction, receipt }
      }

      if (!chainId) return
      let transaction: TransactionResponse | undefined = undefined
      try {
        setState({ status: 'PendingSignature', chainId, transactionName: options?.transactionName })
        if (options?.enablePendingSignatureNotification) {
          addNotification({
            notification: {
              type: 'transactionPendingSignature',
              submittedAt: Date.now(),
              transactionName: options?.transactionName,
              transactionRequest,
            },
            chainId: chainId,
          })
        }
        const isContractWallet = !(await isNonContractWallet(library, account))
        if (isContractWallet) {
          const result = await handleContractWallet(transactionPromise, { safeTransaction })
          transaction = result?.transaction
          return result?.receipt
        } else {
          transaction = await transactionPromise
          const result = await handleNonContractWallet(transaction)
          transaction = result?.transaction
          return result?.receipt
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

            setState((prevState) => ({
              ...prevState,
              status,
              transaction: e.replacement,
              originalTransaction: transaction,
              receipt: e.receipt,
              transactionName: e.replacement?.transactionName,
              errorMessage,
              errorCode,
              errorHash,
              chainId,
            }))
          } else {
            setState({
              status: 'Fail',
              transaction,
              receipt: e.receipt,
              errorMessage,
              errorCode,
              errorHash,
              chainId,
              transactionName: options?.transactionName,
            })
          }
        } else {
          setState({
            status: 'Exception',
            errorMessage,
            errorCode,
            errorHash,
            chainId,
            transactionName: options?.transactionName,
          })
        }
        return undefined
      }
    },
    [chainId, addNotification, options?.transactionName, library, account]
  )

  return { promiseTransaction, state, resetState }
}
