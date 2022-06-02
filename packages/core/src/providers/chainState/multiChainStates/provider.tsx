import { ReactNode, useEffect, useMemo, useReducer } from 'react'
import { useDebouncePair, useBlockNumbers } from '../../../hooks'
import { MultiChainStatesContext } from './context'
import { ChainId, State, useConfig, useNetwork } from '../../..'
import { useReadonlyNetworks } from '../../network'
import { fromEntries } from '../../../helpers/fromEntries'
import { performMulticall } from '../common/performMulticall'
import { Providers } from '../../network/readonlyNetworks/model'
import { BaseProvider } from '@ethersproject/providers'
import { callsReducer, chainStateReducer, multicall1Factory, multicall2Factory } from '../common'
import { getUniqueActiveCalls } from '../../../helpers'
import { useDevtoolsReporting } from '../common/useDevtoolsReporting'
import { useChainId } from '../../../hooks/useChainId'
import { useWindow } from '../../window/context'

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

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function MultiChainStateProvider({ children, multicallAddresses }: Props) {
  const { multicallVersion, fastMulticallEncoding } = useConfig()
  const networks = useReadonlyNetworks()
  const blockNumbers = useBlockNumbers()
  const { reportError } = useNetwork()
  const { isActive } = useWindow()

  const [calls, dispatchCalls] = useReducer(callsReducer, [])
  const [state, dispatchState] = useReducer(chainStateReducer, {})

  const multicall = (multicallVersion === 1 ? multicall1Factory : multicall2Factory)(fastMulticallEncoding ?? false)

  const [debouncedCalls, debouncedNetworks] = useDebouncePair(calls, networks, 50)
  const uniqueCalls = useMemo(() => getUniqueActiveCalls(debouncedCalls), [debouncedCalls])

  // used for deep equality in hook dependencies
  const uniqueCallsJSON = JSON.stringify(debouncedCalls)

  const chainId = useChainId()
  useDevtoolsReporting(
    uniqueCallsJSON,
    uniqueCalls,
    chainId !== undefined ? blockNumbers[chainId as ChainId] : undefined,
    multicallAddresses
  )

  function multicallForChain(chainId: ChainId, provider?: BaseProvider) {
    if (!isActive) {
      return
    }
    const blockNumber = blockNumbers[chainId]
    const multicallAddress = multicallAddresses[chainId]

    if (!provider || !blockNumber) {
      return
    }
    if (!multicallAddress) {
      reportError(new Error(`Missing multicall address for chain id ${chainId}`))
      return
    }
    if (debouncedNetworks !== networks) {
      // Wait for debounce to catch up.
      return
    }

    const callsOnThisChain = uniqueCalls.filter((call) => call.chainId === chainId)
    if (callsOnThisChain.length === 0) {
      dispatchCalls({ type: 'UPDATE_CALLS', calls, blockNumber, chainId })
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
      reportError
    )
    dispatchCalls({ type: 'UPDATE_CALLS', calls, blockNumber, chainId })
  }

  useEffect(() => {
    for (const [_chainId, provider] of Object.entries(networks)) {
      multicallForChain(Number(_chainId), provider)
    }
  }, [blockNumbers, networks, multicallAddresses, uniqueCallsJSON])

  const chains = useMemo(() => composeChainState(networks, state, multicallAddresses), [
    state,
    multicallAddresses,
    networks,
  ])

  const provided = { chains, dispatchCalls }

  return <MultiChainStatesContext.Provider value={provided} children={children} />
}
