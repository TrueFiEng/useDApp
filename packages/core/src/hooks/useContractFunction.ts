import { TransactionOptions } from '../../src'
import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { useCallback, useState } from 'react'
import { useEthers } from './useEthers'
import { usePromiseTransaction } from './usePromiseTransaction'
import { LogDescription } from 'ethers/lib/utils'

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
  const [events, setEvents] = useState<LogDescription[] | undefined>(undefined)

  const send = useCallback(
    async (...args: any[]) => {
      const contractWithSigner = connectContractToSigner(contract, options, library)
      const receipt = await promiseTransaction(contractWithSigner[functionName](...args))
      if (receipt?.logs) {
        const events = receipt.logs.reduce((accumulatedLogs, log) => {
          try {
            return log.address === contract.address
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

  return { send, state, events }
}
