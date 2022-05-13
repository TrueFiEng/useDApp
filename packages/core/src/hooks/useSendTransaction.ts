import { TransactionRequest } from '@ethersproject/abstract-provider'
import { TransactionOptions } from '../../src'
import { useEthers } from './useEthers'
import { usePromiseTransaction } from './usePromiseTransaction'
import { useConfig } from '../providers/config/context'
import { Signer } from 'ethers'

/**
 * @internal
 */
export async function estimateGasLimit(transactionRequest: TransactionRequest, signer: Signer | undefined, bufferGasLimitPercentage: number) {      
  if (!signer) {
    return undefined
  }
  const estimatedGas = !transactionRequest.gasLimit ? await signer.estimateGas(transactionRequest) : undefined
  return estimatedGas?.mul(bufferGasLimitPercentage + 100).div(100)
}

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
      const gasLimit = estimateGasLimit(transactionRequest, signer, bufferGasLimitPercentage)

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
