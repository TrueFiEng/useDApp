import { ReactNode, useEffect, useReducer } from 'react'
import { useDebouncePair, useEthers } from '../../hooks'
import { useBlockNumber } from '../blockNumber/context'
import { ChainStateContext } from './context'
import { chainStateReducer } from './chainStateReducer'
import { callsReducer, ChainCall } from './callsReducer'
import { multicall } from './multicall'
import { notifyDevtools } from '../devtools'
import { useDevtoolsReporting } from './useDevtoolsReporting'

interface Props {
  children: ReactNode
  multicallAddresses: {
    [chainId: number]: string
  }
}

export function ChainStateProvider({ children, multicallAddresses }: Props) {
  const { library, chainId } = useEthers()
  const blockNumber = useBlockNumber()
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
      const start = Date.now()
      multicall(library, multicallAddress, blockNumber, uniqueCalls)
        .then((state) => {
          dispatchState({ type: 'FETCH_SUCCESS', blockNumber, chainId, state })
          notifyDevtools({
            type: 'MULTICALL_SUCCESS',
            duration: Date.now() - start,
            chainId,
            blockNumber,
            multicallAddress,
            state,
          })
        })
        .catch((error) => {
          console.error(error)
          dispatchState({ type: 'FETCH_ERROR', blockNumber, chainId, error })
          notifyDevtools({
            type: 'MULTICALL_ERROR',
            duration: Date.now() - start,
            chainId,
            blockNumber,
            multicallAddress,
            calls: uniqueCalls,
            error,
          })
        })
    }
  }, [library, blockNumber, chainId, multicallAddress, uniqueCallsJSON])

  const value = chainId !== undefined ? state[chainId] : undefined
  const provided = { value, multicallAddress, dispatchCalls }

  return <ChainStateContext.Provider value={provided} children={children} />
}

function getUnique(requests: ChainCall[]) {
  const unique: ChainCall[] = []
  for (const request of requests) {
    if (!unique.find((x) => x.address === request.address && x.data === request.data)) {
      unique.push(request)
    }
  }
  return unique
}
