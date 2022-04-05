import { addressEqual, TransactionOptions } from '../../src'
import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { useCallback, useState } from 'react'
import { useEthers } from './useEthers'
import { usePromiseTransaction } from './usePromiseTransaction'
import { LogDescription } from 'ethers/lib/utils'
import { ContractFunctionNames, Params, TypedContract } from '../model/types'

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function connectContractToSigner(contract: Contract, options?: TransactionOptions, library?: JsonRpcProvider) {
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

/**
 * @public
 */
export function useContractFunction<T extends TypedContract, FN extends ContractFunctionNames<T>>(
  contract: T,
  functionName: FN,
  options?: TransactionOptions
) {
  const { library, chainId } = useEthers()
  const { promiseTransaction, state, resetState } = usePromiseTransaction(chainId, options)
  const [events, setEvents] = useState<LogDescription[] | undefined>(undefined)

  const send = useCallback(
    async (...args: Params<T, FN>): Promise<void> => {
      const contractWithSigner = connectContractToSigner(contract, options, library)
      const receipt = await promiseTransaction(contractWithSigner[functionName](...args))
      if (receipt?.logs) {
        const events = receipt.logs.reduce((accumulatedLogs, log) => {
          try {
            return addressEqual(log.address, contract.address)
              ? [...accumulatedLogs, contract.interface.parseLog(log)]
              : accumulatedLogs
          } catch (_err) {
            return accumulatedLogs
          }
        }, [] as LogDescription[])
        setEvents(events)
      }
    },
    [contract, functionName, options, library]
  )

  return { send, state, events, resetState }
}
