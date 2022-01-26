import { Context, ReactNode, useEffect, useReducer } from 'react'
import { useDebouncePair, useEthers } from '../../hooks'
import { useBlockNumber } from '../blockNumber/context'
import { Multicall1ChainStateContext, Multicall2ChainStateContext, MulticallContext } from './context'
import { callsReducer, ChainCall } from './callsReducer'
import { multicall } from './multicall'
import { notifyDevtools } from '../devtools'
import { useDevtoolsReporting } from './useDevtoolsReporting'
import { ChainState, useNetwork } from '../../providers'
import { getUniqueCalls } from '../../helpers'
import { multicall2 } from './multicall2'
import { getChainStateReducer } from './chainStateReducer'
import { JsonRpcProvider } from '@ethersproject/providers'

interface Props {
  children: ReactNode
  multicallAddresses: {
    [chainId: number]: string
  }
}

interface GenericProps<T extends ChainState> extends Props {
  multicallCallback: (
    library: JsonRpcProvider,
    multicallAddress: string,
    blockNumber: number,
    uniqueCalls: ChainCall[]
  ) => Promise<T>
  context: Context<MulticallContext<T>>
}

function ChainStateGenericProvider<T extends ChainState>({
  children,
  multicallAddresses,
  multicallCallback,
  context,
}: GenericProps<T>) {
  const { library, chainId } = useEthers()
  const blockNumber = useBlockNumber()
  const { reportError } = useNetwork()
  const [calls, dispatchCalls] = useReducer(callsReducer, [])
  const [state, dispatchState] = useReducer(getChainStateReducer<T>(), {})

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
      const start = Date.now()
      multicallCallback(library, multicallAddress, blockNumber, uniqueCalls)
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
          reportError(error)
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

  return <context.Provider value={provided} children={children} />
}

export function ChainStateProvider({ children, multicallAddresses }: Props) {
  return (
    <ChainStateGenericProvider
      multicallAddresses={multicallAddresses}
      multicallCallback={multicall}
      context={Multicall1ChainStateContext}
    >
      {children}
    </ChainStateGenericProvider>
  )
}

export function ChainState2Provider({ children, multicallAddresses }: Props) {
  return (
    <ChainStateGenericProvider
      multicallAddresses={multicallAddresses}
      multicallCallback={multicall2}
      context={Multicall2ChainStateContext}
    >
      {children}
    </ChainStateGenericProvider>
  )
}
