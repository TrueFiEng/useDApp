import { TransactionResponse } from '@ethersproject/abstract-provider'
import { BigNumber, Signer } from 'ethers'
import { useState } from 'react'
import { useTransactionsContext } from '../providers'
import { TransactionStatus } from '../../src'
import { useEthers } from './useEthers'

interface Options {
  signer?: Signer
  transactionName?: string
}

export function useSendEther() {
  const [state, setState] = useState<TransactionStatus>({ status: 'None' })
  const { addTransaction } = useTransactionsContext()
  const { library, chainId } = useEthers()

  let transaction: TransactionResponse | undefined

  const sendEther = async (address: string, value: BigNumber, options?: Options) => {
    const signer = options?.signer || library?.getSigner()
    if (!chainId) return
    if (!signer) return

    try {
      transaction = await signer.sendTransaction({ to: address, value })

      setState({ transaction, status: 'Mining', chainId })
      addTransaction({
        transaction,
        submittedAt: Date.now(),
        transactionName: options?.transactionName,
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

  return { sendEther, state }
}
