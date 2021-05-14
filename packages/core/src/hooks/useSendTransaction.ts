import { TransactionResponse, TransactionRequest } from '@ethersproject/abstract-provider'
import { Signer } from 'ethers'
import React, { useState } from 'react'
import { StoredTransaction, useTransactionsContext } from '../providers'
import { TransactionStatus } from '../../src'
import { useEthers } from './useEthers'

async function handleTransactionState(
  transactionPromise: Promise<TransactionResponse>,
  setState: React.Dispatch<React.SetStateAction<TransactionStatus>>,
  addTransaction: (payload: StoredTransaction) => void,
  chainId: number,
  transactionName?: string
) {
  let transaction: TransactionResponse | undefined = undefined
  try {
    transaction = await transactionPromise

    setState({ transaction, status: 'Mining', chainId })
    addTransaction({
      transaction,
      submittedAt: Date.now(),
      transactionName,
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

interface Options {
  signer?: Signer
  transactionName?: string
}

export function useSendTransaction(options?: Options) {
  const [state, setState] = useState<TransactionStatus>({ status: 'None' })
  const { addTransaction } = useTransactionsContext()
  const { library, chainId } = useEthers()

  const sendTransaction = async (transactionRequest: TransactionRequest) => {
    const signer = options?.signer || library?.getSigner()

    if (!chainId) return
    if (!signer) return

    await handleTransactionState(
      signer.sendTransaction(transactionRequest),
      setState,
      addTransaction,
      chainId,
      options?.transactionName
    )
  }

  return { sendTransaction, state }
}
