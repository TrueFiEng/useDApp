import { TransactionReceipt, TransactionResponse } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { useState } from 'react'
import { ChainId } from '../constants'
import { useEthers } from './useEthers'

type TransactionStatus =
  | {
      status: 'None'
    }
  | {
      status: 'Mining'
      chainId: ChainId
      transaction: TransactionResponse
    }
  | {
      status: 'Success'
      chainId: ChainId
      transaction: TransactionResponse
      receipt: TransactionReceipt
    }
  | {
      status: 'Fail'
      transaction: TransactionResponse
      receipt?: TransactionReceipt
      chainId: ChainId
      errorMessage: string
    }
  | {
      status: 'Exception'
      chainId: ChainId
      errorMessage: string
    }

interface Options {
  signer?: Signer
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
  const [state, setState] = useState<TransactionStatus>({ status: 'None' })

  const { library, chainId } = useEthers()

  const contractWithSigner = connectContractToSigner(contract, options, library)

  let transaction: TransactionResponse

  const send = async (...args: any[]) => {
    if (!chainId) {
      return
    }

    try {
      transaction = await contractWithSigner[functionName](...args)
      setState({ transaction, status: 'Mining', chainId })

      const receipt = await transaction.wait()
      setState({ receipt, transaction, status: 'Success', chainId })
    } catch (e) {
      if (transaction) {
        setState({ status: 'Fail', transaction, receipt: e.receipt, errorMessage: e.reason, chainId })
      } else {
        setState({ status: 'Exception', errorMessage: e.reason, chainId })
      }
    }
  }

  return { send, state }
}
