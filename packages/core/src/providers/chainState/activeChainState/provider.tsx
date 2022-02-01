import { ReactNode, useEffect, useReducer } from 'react'
import { useDebouncePair, useEthers } from '../../../hooks'
import { useBlockNumber } from '../../blockNumber/activeBlockNumber'
import { ActiveChainStateContext } from './context'
import { callsReducer, chainStateReducer } from '../common'
import { useDevtoolsReporting } from '../common/useDevtoolsReporting'
import { useNetwork } from '../../..'
import { performMulticall } from '../common/performMulticall'
import { getUnique } from '../common/getUnique'

interface Props {
  children: ReactNode
  multicallAddresses: {
    [chainId: number]: string
  }
}

export function ActiveChainStateProvider({ children, multicallAddresses }: Props) {
  const { library, chainId } = useEthers()
  const blockNumber = useBlockNumber()
  const { reportError } = useNetwork()
  const [calls, dispatchCalls] = useReducer(callsReducer, [])
  const [state, dispatchState] = useReducer(chainStateReducer, {})

  const [debouncedCalls, debouncedId] = useDebouncePair(calls, chainId, 50)
  const uniqueCalls = debouncedId === chainId ? getUnique(debouncedCalls) : []
  // used for deep equality in hook dependencies
  const uniqueCallsJSON = JSON.stringify(uniqueCalls)

  const multicallAddress = chainId !== undefined ? multicallAddresses[chainId] : undefined

  useDevtoolsReporting(uniqueCallsJSON, uniqueCalls, blockNumber, multicallAddresses)

  useEffect(() => {
    if (library && blockNumber !== undefined && chainId !== undefined) {
      if (!multicallAddress) {
        console.error(`Missing multicall address for chain id ${chainId}`)
        return
      }
      performMulticall(library, multicallAddress, blockNumber, uniqueCalls, dispatchState, chainId, reportError)
    }
  }, [library, blockNumber, chainId, multicallAddress, uniqueCallsJSON])

  const value = chainId !== undefined ? state[chainId] : undefined
  const provided = { value, multicallAddress, dispatchCalls }

  return <ActiveChainStateContext.Provider value={provided} children={children} />
}
