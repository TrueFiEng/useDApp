import { ReactNode, useEffect, useReducer } from 'react'
import { useDebouncePair, useEthers } from '../../../hooks'
import { useBlockNumber } from '../../blockNumber/blockNumber'
import { ChainStateContext } from './context'
import { callsReducer, chainStateReducer, multicall2, multicall as multicall1 } from '../common'
import { useDevtoolsReporting } from '../common/useDevtoolsReporting'
import { getUniqueCalls, useConfig, useNetwork } from '../../..'
import { performMulticall } from '../common/performMulticall'

interface Props {
  children: ReactNode
  multicallAddresses: {
    [chainId: number]: string
  }
}

export function ChainStateProvider({ children, multicallAddresses }: Props) {
  const { multicallVersion } = useConfig()
  const { library, chainId } = useEthers()
  const blockNumber = useBlockNumber()
  const { reportError } = useNetwork()
  const [calls, dispatchCalls] = useReducer(callsReducer, [])
  const [state, dispatchState] = useReducer(chainStateReducer, {})

  const multicall = multicallVersion === 1 ? multicall1 : multicall2

  const [debouncedCalls, debouncedId] = useDebouncePair(calls, chainId, 50)
  const uniqueCalls = debouncedId === chainId ? getUniqueCalls(debouncedCalls) : []
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
      performMulticall(
        library,
        multicall,
        multicallAddress,
        blockNumber,
        uniqueCalls,
        dispatchState,
        chainId,
        reportError
      )
    }
  }, [library, blockNumber, chainId, multicallAddress, uniqueCallsJSON, multicall, reportError])

  const value = chainId !== undefined ? state[chainId] : undefined
  const provided = { value, multicallAddress, dispatchCalls }

  return <ChainStateContext.Provider value={provided} children={children} />
}
