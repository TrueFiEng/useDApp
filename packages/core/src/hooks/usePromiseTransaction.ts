import { TransactionResponse } from '@ethersproject/abstract-provider'
import { useState } from 'react'
import { useTransactionsContext } from '../providers'
import { TransactionStatus, TransactionOptions } from '../../src'
import { Signer } from 'ethers'

export function usePromiseTransaction(chainId: number | undefined, options?: TransactionOptions) {
  const [state, setState] = useState<TransactionStatus>({ status: 'None' })
  const { addTransaction } = useTransactionsContext()

  const promiseTransaction = async (
    transactionPromise: Promise<TransactionResponse>,
    signer: Signer,
    transactionName?: string
  ) => {
    const txName = transactionName || options?.transactionName
    if (!chainId) return
    let transaction: TransactionResponse | undefined = undefined
    try {
      transaction = await transactionPromise

      setState({ transaction, status: 'Mining', chainId })
      addTransaction({
        transaction,
        submittedAt: Date.now(),
        transactionName: txName,
        signer,
      })
      const receipt = await transaction.wait()

      setState({ receipt, transaction, status: 'Success', chainId })
    } catch (e) {
      const errorMessage = e.reason ?? e.message
      if (transaction) {
        setState({ status: 'Fail', transaction, receipt: e.receipt, errorMessage, chainId })
      } else {
        setState({ status: 'Exception', errorMessage, chainId })
      }
    }
  }
  return { promiseTransaction, state }
}
