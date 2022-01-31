import { ReactNode, useCallback, useReducer, useState } from 'react'
import { ActiveNetworkContext } from './context'
import { defaultNetworkState, networksReducer } from './reducer'
import { Network } from './model'
import { JsonRpcProvider, Web3Provider, ExternalProvider } from '@ethersproject/providers'
import { EventEmitter } from 'events'
import { subscribeToProviderEvents } from '../../helpers/eip1193'

interface ActiveNetworkProviderProps {
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

export function ActiveNetworkProvider({ children }: ActiveNetworkProviderProps) {
  const [network, dispatch] = useReducer(networksReducer, defaultNetworkState)
  const [onUnsubscribe, setOnUnsubscribe] = useState<() => void>(() => () => undefined)

  const update = useCallback(
    (newNetwork: Partial<Network>) => {
      dispatch({ type: 'UPDATE_NETWORK', network: newNetwork })
    },
    [network]
  )

  const reportError = useCallback((error: Error) => {
    console.error(error)
    dispatch({ type: 'ADD_ERROR', error })
  }, [])

  const deactivate = useCallback(() => {
    update({
      accounts: [],
    })
  }, [])

  const onDisconnect = useCallback((error) => {
    deactivate()
    reportError(error)
  }, [])

  const activate = useCallback(
    async (provider: JsonRpcProvider | (EventEmitter & ExternalProvider)) => {
      const wrappedProvider = provider instanceof JsonRpcProvider ? provider : new Web3Provider(provider)
      try {
        const account = await tryToGetAccount(wrappedProvider)
        const chainId = (await wrappedProvider.getNetwork())?.chainId
        onUnsubscribe()
        const clearSubscriptions = subscribeToProviderEvents((wrappedProvider as any).provider, update, onDisconnect)
        setOnUnsubscribe(() => clearSubscriptions)
        update({
          provider: wrappedProvider,
          chainId,
          accounts: account ? [account] : [],
        })
      } catch (e) {
        reportError(e)
      }
    },
    [onUnsubscribe]
  )

  return (
    <ActiveNetworkContext.Provider value={{ network, update, activate, deactivate, reportError }} children={children} />
  )
}
