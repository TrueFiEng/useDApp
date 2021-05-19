import { TransactionRequest } from '@ethersproject/abstract-provider'
import { TransactionOptions } from '../../src'
import { useEthers } from './useEthers'
import { usePromiseTransaction } from './usePromiseTransaction'

import { TransactionResponse } from '@ethersproject/abstract-provider'
import { BigNumber } from '@ethersproject/bignumber'

export interface OverrideRespond {
  transaction?: TransactionRequest
  errorMessage?: string
}

export interface OverrideRequest {
  gasIncrease?: BigNumber
  transaction?: TransactionResponse
}

export function useSendTransaction(options?: TransactionOptions) {
  const { library, chainId } = useEthers()
  const { promiseTransaction, state } = usePromiseTransaction(chainId, options)

  const sendTransaction = async (transactionRequest: TransactionRequest) => {
    const signer = options?.signer || library?.getSigner()
    if (signer) {
      await promiseTransaction(signer.sendTransaction(transactionRequest))
    }
  }

  const overrideTransaction = async (
    cancel: boolean,
    transactionResponse?: TransactionResponse,
    gasIncrease?: BigNumber
  ): Promise<OverrideRespond> => {
    const response = transactionResponse || state.transaction
    if (!response) {
      return { errorMessage: 'No transaction' }
    }
    let transaction: TransactionRequest
    const gasTxIncrease = gasIncrease || response.gasPrice.div(10)

    if (cancel) {
      transaction = {
        to: response.from,
        from: response.from,
        nonce: response.nonce,

        gasLimit: response.gasLimit,
        gasPrice: response.gasPrice.add(gasTxIncrease),
        value: 0,
      }
    } else {
      transaction = {
        to: response.to,
        from: response.from,
        nonce: response.nonce,

        gasLimit: response.gasLimit,
        gasPrice: response.gasPrice.add(gasTxIncrease),

        data: response.data,
        value: response.value,
        chainId: response.chainId,

        type: response.type || undefined,
        accessList: response.accessList,
      }
    }

    if (response.blockHash) {
      return { transaction: transaction, errorMessage: 'Transaction already mmined' }
    }
    if (library?.connection.url === 'metamask') {
      return { transaction, errorMessage: "Metamask doesn't support custom nonce" }
    }
    const signer = options?.signer || library?.getSigner()
    if (!signer) {
      return { transaction, errorMessage: 'No signer' }
    }
    if ((await signer.getAddress()) != transaction.from) {
      return { transaction, errorMessage: "Signer doesn't match transaction sender" }
    }
    await promiseTransaction(signer.sendTransaction(transaction))
    return { transaction }
  }

  const cancel = async (overrideRequest?: OverrideRequest) => {
    return await overrideTransaction(true, overrideRequest?.transaction, overrideRequest?.gasIncrease)
  }

  const speedUp = async (overrideRequest?: OverrideRequest) => {
    return await overrideTransaction(false, overrideRequest?.transaction, overrideRequest?.gasIncrease)
  }

  return { sendTransaction, state, cancel, speedUp }
}
