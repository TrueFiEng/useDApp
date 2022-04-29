import { TransactionRequest } from '@ethersproject/abstract-provider'
import { TransactionOptions } from '../../src'
import { useEthers } from './useEthers'
import { usePromiseTransaction } from './usePromiseTransaction'

/**
 * Hook returns an object with three variables: `state`, `resetState`, and `sendTransaction`.
 * 
 * ``tate` represents the status of transaction. See {@link TransactionStatus}.
 * 
 * `resetState` can be used to reset the state to `None` after a transaction attempt has either succeeded or failed.
 * 
 * To send a transaction use `sendTransaction` function returned by `useSendTransaction`.
 * 
 * Function accepts a [Transaction Request](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionRequest) object as a parameter.
 * @public
 * @param {TransactionOptions} options additional options of type {@link TransactionOptions}
 * @returns { sendTransaction: (...args: any[]) => void, state: TransactionStatus } object with two variables: `sendTransaction` and `state`
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
  const { promiseTransaction, state, resetState } = usePromiseTransaction(chainId, options)

  const sendTransaction = async (transactionRequest: TransactionRequest) => {
    const signer = options?.signer || library?.getSigner()
    if (signer) {
      await promiseTransaction(signer.sendTransaction(transactionRequest))
    }
  }

  return { sendTransaction, state, resetState }
}
