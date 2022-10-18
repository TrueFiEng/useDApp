import type { TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider'
import { useCallback, useEffect, useState } from 'react'
import { useNotificationsContext, useTransactionsContext } from '../providers'
import { TransactionStatus, TransactionOptions, TransactionState } from '../model'
import { BigNumber, Contract, errors, Signer, utils } from 'ethers'
import { buildSafeTransaction, getLatestNonce, GNOSIS_SAFE_ABI, SafeTransaction } from '../helpers/gnosisSafeUtils'
import { useEthers } from './useEthers'
import { waitForSafeTransaction } from '../helpers/gnosisSafeUtils'
import { JsonRpcProvider, FallbackProvider } from '@ethersproject/providers'

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
  const [state, setState] = useState<TransactionStatus>({ status: 'None' })
  const { addTransaction, updateTransaction } = useTransactionsContext()
  const { addNotification } = useNotificationsContext()
  const { library, account } = useEthers()
  let gnosisSafeContract: Contract | undefined = undefined

  useEffect(() => {
    return () => {
      gnosisSafeContract?.removeAllListeners()
    }
  }, [gnosisSafeContract])

  const resetState = useCallback(() => {
    setState({ status: 'None' })
  }, [setState])

  const promiseTransaction = useCallback(
    async (transactionPromise: Promise<TransactionResponse>, { safeTransaction }: PromiseTransactionOpts = {}) => {
      if (!chainId) return
      let transaction: TransactionResponse | undefined = undefined
      try {
        setState({ status: 'PendingSignature', chainId })

        const result = (await isNonContractWallet(library, account))
          ? await handleNonContractWallet(transactionPromise)
          : await handleContractWallet(transactionPromise, { safeTransaction })
        transaction = result?.transaction
        return result?.receipt
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

  const handleNonContractWallet = async (transactionPromise: Promise<TransactionResponse>) => {
    if (!chainId) return

    const transaction = await transactionPromise

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
    updateTransaction({
      transaction: {
        ...transaction,
        chainId: chainId,
      },
      receipt,
    })
    setState({ receipt, transaction, status: 'Success', chainId })
    return { transaction, receipt }
  }

  const handleContractWallet = async (
    transactionPromise: Promise<TransactionResponse>,
    { safeTransaction }: PromiseTransactionOpts = {}
  ) => {
    if (!chainId || !library || !account) return
    setState({ status: 'CollectingSignaturePool', chainId })

    gnosisSafeContract = new Contract(account, new utils.Interface(GNOSIS_SAFE_ABI), library)

    const latestNonce = await getLatestNonce(chainId, account)

    const safeTx = buildSafeTransaction({
      to: safeTransaction?.to ?? '',
      value: safeTransaction?.value,
      data: safeTransaction?.data,
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
      setState({ receipt, transaction, status: 'Success', chainId })
    }
    return { transaction, receipt }
  }

  return { promiseTransaction, state, resetState }
}
