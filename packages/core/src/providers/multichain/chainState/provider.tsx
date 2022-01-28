import { ReactNode, useEffect, useMemo, useReducer } from 'react'
import { useDebouncePair } from '../../../hooks'
import { MultiChainStatesContext } from './context'
import { notifyDevtools } from '../../devtools'
import { addressEqual, callsReducer, ChainCall, ChainId, chainStateReducer, multicall, useNetwork } from '../../..'
import { useReadonlyNetworks } from '../readonlyNetworks'
import { useMultiBlockNumbers } from '../blockNumbers'

interface Props {
  children: ReactNode
  multicallAddresses: {
    [chainId: number]: string
  }
}

export function MultiChainStateProvider({ children, multicallAddresses }: Props) {
  const networks = useReadonlyNetworks()
  const blockNumbers = useMultiBlockNumbers()
  const { reportError } = useNetwork()

  const [calls, dispatchCalls] = useReducer(callsReducer, [])
  const [state, dispatchState] = useReducer(chainStateReducer, {})

  const [debouncedCalls, debouncedNetworks] = useDebouncePair(calls, networks, 50)
  const uniqueCalls = debouncedNetworks === networks ? getUnique(debouncedCalls) : []
  // used for deep equality in hook dependencies
  const uniqueCallsJSON = JSON.stringify(uniqueCalls)

  useEffect(() => {
    for (const [_chainId, provider] of Object.entries(networks)) {
      const chainId: ChainId = Number(_chainId)
      const blockNumber = blockNumbers[chainId]
      const calls = uniqueCalls.filter((call) => call.chainId === chainId)
      if (!provider || !chainId || !blockNumber) {
        continue
      }
      const multicallAddress = multicallAddresses[chainId]
      if (!multicallAddress) {
        reportError(new Error(`Missing multicall address for chain id ${chainId}`))
        continue
      }
      const start = Date.now()
      multicall(provider, multicallAddress, blockNumber, calls)
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
            calls,
            error,
          })
        })
    }
  }, [blockNumbers, networks, multicallAddresses, uniqueCallsJSON])

  const chains = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(networks).map(([chainId]) => [
          chainId,
          {
            value: state[Number(chainId)],
            multicallAddress: multicallAddresses[Number(chainId)],
          },
        ])
      ),
    [state, multicallAddresses, networks]
  )

  const provided = { chains, dispatchCalls }

  return <MultiChainStatesContext.Provider value={provided} children={children} />
}

function getUnique(requests: ChainCall[]) {
  const unique: ChainCall[] = []
  for (const request of requests) {
    if (!unique.find((x) => addressEqual(x.address, request.address) && x.data === request.data)) {
      unique.push(request)
    }
  }
  return unique
}
