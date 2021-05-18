import { usePromiseTransaction } from './usePromiseTransaction'
import { StoredTransaction } from '../providers/transactions/model'
import { useEthers } from './useEthers'
import { TransactionRequest } from '@ethersproject/providers'
import { BigNumber, utils } from 'ethers'

export interface overrideRespond {
  request: TransactionRequest
  error?: string
}

export function useTransactionOverride() {
  const { chainId, library } = useEthers()
  const { promiseTransaction, state } = usePromiseTransaction(chainId)

  const overrideTransaction = async (
    transaction: StoredTransaction,
    transactionRequest: TransactionRequest
  ): Promise<overrideRespond> => {
    const request: TransactionRequest = { ...transactionRequest, nonce: transaction.transaction.nonce }
    if (library?.connection.url === 'metamask') {
      return { request, error: "Metamask doesn't support custom nonce" }
    }
    if (transaction.signer) {
      await promiseTransaction(
        transaction.signer.sendTransaction(request),
        transaction.signer,
        transaction.transactionName
      )
      return { request }
    } else {
      return { request, error: 'Transaction has no signer' }
    }
  }

  const cancelTransaction = async (transaction: StoredTransaction, gasIncrease?: BigNumber) => {
    const gasTxIncrease = gasIncrease || BigNumber.from('10000000000')
    const request: TransactionRequest = {
      to: transaction.transaction.from,
      from: transaction.transaction.from,
      nonce: transaction.transaction.nonce,

      gasLimit: transaction.transaction.gasLimit,
      gasPrice: transaction.transaction.gasPrice.add(gasTxIncrease),

      value: 0,
    }
    return await overrideTransaction(transaction, request)
  }

  const speedUpTransaction = async (transaction: StoredTransaction, gasIncrease?: BigNumber) => {
    const gasTxIncrease = gasIncrease || BigNumber.from('10000000000')
    const request: TransactionRequest = {
      to: transaction.transaction.to,
      from: transaction.transaction.from,
      nonce: transaction.transaction.nonce,

      gasLimit: transaction.transaction.gasLimit,
      gasPrice: transaction.transaction.gasPrice.add(gasTxIncrease),

      data: transaction.transaction.data,
      value: transaction.transaction.value,
      chainId: transaction.transaction.chainId,

      type: transaction.transaction.type || undefined,
      accessList: transaction.transaction.accessList,
    }
    return await overrideTransaction(transaction, request)
  }

  return { overrideTransaction, cancelTransaction, speedUpTransaction, overrideState: state }
}
