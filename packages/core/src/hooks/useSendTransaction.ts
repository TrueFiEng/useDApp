import { TransactionRequest } from '@ethersproject/abstract-provider'
import { TransactionOptions } from '../../src'
import { useEthers } from './useEthers'
import { usePromiseTransaction } from './usePromiseTransaction'
import { useConfig } from '../providers/config/context'
import { BigNumber, Signer } from 'ethers'

async function estimateGas(signer: Signer, transactionRequest: TransactionRequest) {
  let estimatedGas: BigNumber | undefined = undefined
  try {
    estimatedGas = await signer.estimateGas(transactionRequest)
  } catch (err) {
    console.error('Invalid sender address')
  }
  return estimatedGas
}

/**
 * @public
 */
export function useSendTransaction(options?: TransactionOptions) {
  const { library, chainId } = useEthers()
  const { promiseTransaction, state, resetState } = usePromiseTransaction(chainId, options)
  const { bufferGasLimitPercentage } = useConfig()

  const sendTransaction = async (transactionRequest: TransactionRequest) => {
    const signer = options?.signer || library?.getSigner()
    if (signer) {
      const estimatedGas = await estimateGas(signer, transactionRequest)
      const gasLimit = bufferGasLimitPercentage ? estimatedGas?.mul(bufferGasLimitPercentage + 100).div(100) : undefined
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
