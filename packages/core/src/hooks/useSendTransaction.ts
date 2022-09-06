import type { TransactionRequest } from '@ethersproject/abstract-provider'
import { TransactionOptions } from '../model/TransactionOptions'
import { useConfig } from './useConfig'
import { useEthers } from './useEthers'
import { estimateTransactionGasLimit, usePromiseTransaction } from './usePromiseTransaction'
import { useReadonlyNetworks } from '../providers/network/readonlyNetworks/context'
import { ChainId } from '../constants'
import { getSignerFromOptions } from '../helpers/getSignerFromOptions'
import { providers } from 'ethers'

/**
 * Hook returns an object with three variables: `state`, `resetState`, and `sendTransaction`.
 *
 * ``state` represents the status of transaction. See {@link TransactionStatus}.
 *
 * `resetState` can be used to reset the state to `None` after a transaction attempt has either succeeded or failed.
 *
 * To send a transaction use `sendTransaction` function returned by `useSendTransaction`.
 *
 * Function accepts a [Transaction Request](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionRequest) object as a parameter.
 * @public
 * @param options additional options of type {@link TransactionOptions}
 * @returns {} object with two variables: `sendTransaction` and `state`: `{ sendTransaction: (...args: any[]) => void, state: TransactionStatus }`.
 *
 * @example
 * const { sendTransaction, state } = useSendTransaction({ transactionName: 'Send Ethereum' })
 *
 * const handleClick = () => {
 *   ...
 *   sendTransaction({ to: address, value: utils.parseEther(amount) })
 * }
 */
export function useSendTransaction(options?: TransactionOptions) {
  const { library, chainId } = useEthers()
  const transactionChainId = (options && 'chainId' in options && options?.chainId) || chainId
  const { promiseTransaction, state, resetState } = usePromiseTransaction(transactionChainId, options)

  const config = useConfig()
  const gasLimitBufferPercentage =
    options?.gasLimitBufferPercentage ?? options?.bufferGasLimitPercentage ?? config?.gasLimitBufferPercentage ?? 0

  const providers = useReadonlyNetworks()
  const provider = (transactionChainId && providers[transactionChainId as ChainId])!

  const sendTransaction = async (transactionRequest: TransactionRequest) => {
    const signer = getSignerFromOptions(provider as providers.BaseProvider, options, library)

    if (signer) {
      const gasLimit = await estimateTransactionGasLimit(transactionRequest, signer, gasLimitBufferPercentage)

      return promiseTransaction(
        signer.sendTransaction({
          ...transactionRequest,
          gasLimit,
        }),
        {
          safeTransaction: {
            to: transactionRequest.to,
            value: transactionRequest.value?.toString(),
          },
        }
      )
    }
  }

  return { sendTransaction, state, resetState }
}
