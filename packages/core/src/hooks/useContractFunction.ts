import { TransactionOptions } from '../../src'
import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { useEthers } from './useEthers'
import { usePromiseTransaction } from './usePromiseTransaction'

export function connectContractToSigner(contract: Contract, options?: TransactionOptions, library?: Web3Provider) {
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

export function useContractFunction(contract: Contract, functionName: string, options?: TransactionOptions) {
  const { library, chainId } = useEthers()
  const { promiseTransaction, state } = usePromiseTransaction(chainId, options)

  const send = async (...args: any[]) => {
    const contractWithSigner = connectContractToSigner(contract, options, library)
    await promiseTransaction(contractWithSigner[functionName](...args))
  }

  return { send, state }
}
