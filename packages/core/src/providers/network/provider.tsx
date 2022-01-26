import { ReactNode, useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { NetworkContext } from './context'
import { defaultNetworkState, networksReducer } from './reducer'
import { Network, NetworkError } from './model'
import { ExternalProvider, JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { EventEmitter } from 'events'
import { subscribeToProviderEvents } from '../../helpers/eip1193'
import { ChainId } from '../../constants'

interface NetworkProviderProps {
  children: ReactNode
}

async function tryToGetAccount(provider: JsonRpcProvider) {
  try {
    return await provider.getSigner().getAddress()
  } catch (e) {
    if (e.code === 'UNSUPPORTED_OPERATION') {
      // readonly provider
      return undefined
    }
    throw e
  }
}

export function NetworkProvider({ children }: NetworkProviderProps) {
  const [networks, dispatch] = useReducer(networksReducer, defaultNetworkState)
  const [activeNetworkId, setActiveNetworkId] = useState<ChainId | undefined>()

  const update = useCallback(
    (...args: [_chainId: ChainId, _newNetwork: Partial<Network>] | [_newNetwork: Partial<Network>]) => {
      const newNetwork = args.length === 2 ? args[1] : args[0]
      const chainId = args.length === 2 ? args[0] : newNetwork.chainId ?? activeNetworkId
      if (!chainId) {
        throw new Error('ChainId not specified')
      }
      if (newNetwork.chainId && chainId && newNetwork.chainId !== chainId) {
        dispatch({ type: 'CHANGE_CHAIN_ID', oldChainId: chainId, newChainId: newNetwork.chainId })
      }
      dispatch({ type: 'UPDATE_NETWORK', network: newNetwork, chainId: newNetwork.chainId ?? chainId })
    },
    []
  )

  const onActiveNetworkUpdate = useCallback(
    (activeNetworkUpdate: Partial<Network>) => {
      console.log(activeNetworkId, activeNetworkUpdate)
      if (activeNetworkId) {
        update(activeNetworkId, activeNetworkUpdate)
      }
      if (activeNetworkUpdate.chainId && activeNetworkUpdate.chainId !== activeNetworkId) {
        setActiveNetworkId(activeNetworkUpdate.chainId)
      }
    },
    [activeNetworkId]
  )

  useEffect(() => {
    if (!activeNetworkId) {
      return
    }

    return subscribeToProviderEvents(
      (networks.networks[activeNetworkId] as any)?.provider?.provider,
      onActiveNetworkUpdate,
      onDisconnect
    )
  }, [networks, activeNetworkId])

  const reportError = useCallback((error: NetworkError) => {
    console.error(error)
    dispatch({ type: 'ADD_ERROR', error })
  }, [])

  const deactivate = useCallback(() => {
    if (!activeNetworkId) {
      reportError(new Error('No active network'))
      return
    }
    update(activeNetworkId, {
      accounts: [],
    })
  }, [activeNetworkId])

  const onDisconnect = useCallback((error: NetworkError) => {
    deactivate()
    reportError(error)
  }, [])

  const activate = useCallback(async (provider: JsonRpcProvider | (EventEmitter & ExternalProvider)) => {
    const wrappedProvider = provider instanceof JsonRpcProvider ? provider : new Web3Provider(provider)
    try {
      const account = await tryToGetAccount(wrappedProvider)
      const chainId = (await wrappedProvider.getNetwork())?.chainId
      update(chainId, {
        provider: wrappedProvider,
        chainId,
        accounts: account ? [account] : [],
      })
      setActiveNetworkId(chainId)
    } catch (e) {
      reportError(e)
    }
  }, [])

  const defaultNetwork = useMemo(() => {
    console.log('UUUUU', networks)
    if (activeNetworkId && networks.networks[activeNetworkId]) {
      return networks.networks[activeNetworkId]!
    }
    return {
      provider: undefined,
      chainId: undefined,
      accounts: [],
    }
  }, [activeNetworkId, networks])

  return (
    <NetworkContext.Provider
      value={{
        network: defaultNetwork,
        update,
        activate,
        deactivate,
        reportError,
        errors: networks.errors,
      }}
      children={children}
    />
  )
}
