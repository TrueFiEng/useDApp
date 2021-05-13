import { TransactionResponse } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { useState } from 'react'
import { TransactionStatus } from '../model/TransactionStatus'
import { useTransactionsContext } from '../providers'
import { useEthers } from './useEthers'

interface Options {
  signer?: Signer
  transactionName?: string
}

export function connectContractToSigner(contract: Contract, options?: Options, library?: Web3Provider) {
  if (contract.signer) {
    return contract
  }

  if (options?.signer) {
    return contract.connect(options.signer)
  }

  if (library?.getSigner()) {
    return contract.connect(library.getSigner())
  }

  throw new TypeError('No signer available in contract, options or library')
}

export function useContractFunction(contract: Contract, functionName: string, options?: Options) {
  const [state, setState] = useState<TransactionStatus>({ status: 'None', errored: false })
  const { addTransaction } = useTransactionsContext()
  const { library, chainId } = useEthers()

  let transaction: TransactionResponse

  const send = async (...args: any[]) => {
    if (!chainId) {
      return
    }

    const contractWithSigner = connectContractToSigner(contract, options, library)

    try {
      transaction = await contractWithSigner[functionName](...args)
      setState({ transaction, status: 'Mining', errored: false, chainId })
      addTransaction({
        transaction,
        submittedAt: Date.now(),
        transactionName: options?.transactionName,
      })

      const receipt = await transaction.wait()
      setState({ receipt, transaction, status: 'Success', chainId, errored: false })
    } catch (e) {
      const errorMessage = e.reason ?? e.message
      if (transaction) {
        setState({ status: 'Fail', transaction, receipt: e.receipt, errorMessage, chainId, errored: true })
      } else {
        setState({ status: 'Exception', errorMessage, chainId, errored: true })
      }
    }
  }

  return { send, state }
}
