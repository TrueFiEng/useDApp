import { ReactNode, useEffect, useMemo, useReducer } from 'react'
import { useDebouncePair, useBlockNumbers } from '../../../hooks'
import { MultiChainStatesContext } from './context'
import { ChainId, State, useConfig } from '../../..'
import { useConnector, useReadonlyNetworks } from '../../network'
import { fromEntries } from '../../../helpers/fromEntries'
import { performMulticall } from '../common/performMulticall'
import { Providers } from '../../network/readonlyNetworks/model'
import { providers } from 'ethers'
import { callsReducer, chainStateReducer, multicall1Factory, multicall2Factory, RawCall } from '../common'
import { getCallsForUpdate, getUniqueActiveCalls } from '../../../helpers'
import { useDevtoolsReporting } from '../common/useDevtoolsReporting'
import { useChainId } from '../../../hooks/useChainId'
import { useWindow } from '../../window/context'
import { useUpdateNetworksState } from '../../network/readonlyNetworks/context'

interface Props {
  children: ReactNode
  multicallAddresses: {
    [chainId: number]: string
  }
}

function composeChainState(networks: Providers, state: State, multicallAddresses: Props['multicallAddresses']) {
  return fromEntries(
    Object.keys(networks).map((chainId) => [
      Number(chainId),
      {
        value: state[Number(chainId)],
        multicallAddress: multicallAddresses[Number(chainId)],
      },
    ])
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const stripCall = ({ isStatic, lastUpdatedBlockNumber, ...strippedCall }: RawCall) => strippedCall

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function MultiChainStateProvider({ children, multicallAddresses }: Props) {
  const { multicallVersion, fastMulticallEncoding } = useConfig()
  const networks = useReadonlyNetworks()
  const blockNumbers = useBlockNumbers()
  const dispatchNetworksState = useUpdateNetworksState()
  const isActive = useWindow()

  const [calls, dispatchCalls] = useReducer(callsReducer, [])
  const [state, dispatchState] = useReducer(chainStateReducer, {})
  const { reportError } = useConnector()

  const multicall = (multicallVersion === 1 ? multicall1Factory : multicall2Factory)(fastMulticallEncoding ?? false)

  const [debouncedCalls, debouncedNetworks] = useDebouncePair(calls, networks, 50)
  const uniqueCalls = useMemo(() => getUniqueActiveCalls(debouncedCalls), [debouncedCalls])

  // used for deep equality in hook dependencies
  const uniqueCallsJSON = JSON.stringify(debouncedCalls.map(stripCall))

  const chainId = useChainId()
  useDevtoolsReporting(
    uniqueCallsJSON,
    uniqueCalls,
    chainId !== undefined ? blockNumbers[chainId as ChainId] : undefined,
    multicallAddresses
  )

  function multicallForChain(chainId: ChainId, provider: providers.BaseProvider) {
    if (!isActive) {
      return
    }
    const blockNumber = blockNumbers[chainId]
    const multicallAddress = multicallAddresses[chainId]

    if (!provider || !blockNumber) {
      return
    }

    if (debouncedNetworks !== networks) {
      // Wait for debounce to catch up.
      return
    }

    const updatedCalls = getCallsForUpdate(debouncedCalls, { chainId, blockNumber })
    const callsOnThisChain = getUniqueActiveCalls(updatedCalls)

    if (callsOnThisChain.length > 0 && !multicallAddress) {
      reportError(new Error(`Missing multicall address for chain id ${chainId}`))
      return
    }

    performMulticall(
      provider,
      multicall,
      multicallAddress,
      blockNumber,
      callsOnThisChain,
      dispatchState,
      chainId,
      (error) => {
        dispatchNetworksState({
          type: 'ADD_ERROR',
          chainId,
          error,
        })
      }
    )
    dispatchCalls({ type: 'UPDATE_CALLS', calls, updatedCalls, blockNumber, chainId })
  }

  useEffect(() => {
    for (const [_chainId, provider] of Object.entries(networks)) {
      const chainId = Number(_chainId)
      // chainId is in provider is not the same as the chainId in the state wait for chainId to catch up
      if (chainId === provider.network?.chainId || chainId === provider._network?.chainId) {
        multicallForChain(chainId, provider)
      }
    }
  }, [networks, multicallAddresses, uniqueCallsJSON, blockNumbers])

  const chains = useMemo(() => composeChainState(networks, state, multicallAddresses), [
    state,
    multicallAddresses,
    networks,
  ])

  const provided = { chains, dispatchCalls }

  return <MultiChainStatesContext.Provider value={provided} children={children} />
}
