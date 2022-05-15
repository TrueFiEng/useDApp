import { TransactionRequest } from '@ethersproject/abstract-provider'
import { TransactionOptions } from '../../src'
import { useEthers } from './useEthers'
import { estimateGasLimit, usePromiseTransaction } from './usePromiseTransaction'
import { useConfig } from '../providers/config/context'

/**
 * @public
 */
export function useSendTransaction(options?: TransactionOptions) {
  const { library, chainId } = useEthers()
  const { promiseTransaction, state, resetState } = usePromiseTransaction(chainId, options)
  const { bufferGasLimitPercentage = 0 } = useConfig()

  const sendTransaction = async (transactionRequest: TransactionRequest) => {
    const signer = options?.signer || library?.getSigner()
    if (signer) {
      const gasLimit = await estimateGasLimit(transactionRequest, signer, bufferGasLimitPercentage)

      await promiseTransaction(
        signer.sendTransaction({
          ...transactionRequest,
          gasLimit: transactionRequest.gasLimit ?? gasLimit,
        })
      )
    }
  }

  return { sendTransaction, state, resetState }
}
