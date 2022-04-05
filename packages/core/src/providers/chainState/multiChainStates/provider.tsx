import { ReactNode, useEffect, useMemo, useReducer } from 'react'
import { useDebouncePair } from '../../../hooks'
import { MultiChainStatesContext } from './context'
import {
  ChainId,
  multicall as multicall1,
  multicall2,
  State,
  useConfig,
  useNetwork,
} from '../../..'
import { useReadonlyNetworks } from '../../network'
import { useBlockNumbers } from '../../blockNumber/blockNumbers'
import { fromEntries } from '../../../helpers/fromEntries'
import { performMulticall } from '../common/performMulticall'
import { Providers } from '../../network/readonlyNetworks/model'
import { BaseProvider } from '@ethersproject/providers'
import { callsReducer } from '../common/callsReducer'
import { chainStateReducer } from '../common/chainStateReducer'
import { getUniqueCalls } from '../../../helpers/calls'

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
  const { multicallVersion } = useConfig()
  const networks = useReadonlyNetworks()
  const blockNumbers = useBlockNumbers()
  const { reportError } = useNetwork()

  const [calls, dispatchCalls] = useReducer(callsReducer, [])
  const [state, dispatchState] = useReducer(chainStateReducer, {})

  const multicall = multicallVersion === 1 ? multicall1 : multicall2

  const [debouncedCalls, debouncedNetworks] = useDebouncePair(calls, networks, 50)
  const uniqueCalls = debouncedNetworks === networks ? getUniqueCalls(debouncedCalls) : []
  // used for deep equality in hook dependencies
  const uniqueCallsJSON = JSON.stringify(uniqueCalls)

  function multicallForChain(chainId: ChainId, provider?: BaseProvider) {
    const blockNumber = blockNumbers[chainId]
    const multicallAddress = multicallAddresses[chainId]

    if (!provider || !blockNumber) {
      return
    }
    if (!multicallAddress) {
      reportError(new Error(`Missing multicall address for chain id ${chainId}`))
      return
    }
    const callsOnThisChain = uniqueCalls.filter((call) => call.chainId === chainId)
    if (callsOnThisChain.length === 0) {
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
