import { TransactionResponse } from '@ethersproject/abstract-provider'
import { useCallback, useState } from 'react'
import { useTransactionsContext } from '../providers'
import { TransactionStatus, TransactionOptions } from '../../src'

export function usePromiseTransaction(chainId: number | undefined, options?: TransactionOptions) {
  const [state, setState] = useState<TransactionStatus>({ status: 'None' })
  const { addTransaction } = useTransactionsContext()

  const promiseTransaction = useCallback(
    async (transactionPromise: Promise<TransactionResponse>) => {
      if (!chainId) return
      let transaction: TransactionResponse | undefined = undefined
      try {
        transaction = await transactionPromise

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
        setState({ receipt, transaction, status: 'Success', chainId })
        return receipt
      } catch (e) {
        const errorMessage = e.error?.message ?? e.reason ?? e.data?.message ?? e.message
        if (transaction) {
          setState({ status: 'Fail', transaction, receipt: e.receipt, errorMessage, chainId })
        } else {
          setState({ status: 'Exception', errorMessage, chainId })
        }
        return undefined
      }
    },
    [chainId, setState, addTransaction, options]
  )

  return { promiseTransaction, state }
}
