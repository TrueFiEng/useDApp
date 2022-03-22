import { TransactionRequest } from '@ethersproject/abstract-provider'
import { TransactionOptions } from '../../src'
import { useEthers } from './useEthers'
import { usePromiseTransaction } from './usePromiseTransaction'

/**
 * @public
 */
export function useSendTransaction(options?: TransactionOptions) {
  const { library, chainId } = useEthers()
  const { promiseTransaction, state, resetState } = usePromiseTransaction(chainId, options)

  const sendTransaction = async (transactionRequest: TransactionRequest) => {
    const signer = options?.signer || library?.getSigner()
    if (signer) {
      await promiseTransaction(signer.sendTransaction(transactionRequest))
    }
  }

  return { sendTransaction, state, resetState }
}
