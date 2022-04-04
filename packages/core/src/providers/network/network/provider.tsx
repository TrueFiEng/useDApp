import { ReactNode, useCallback, useEffect, useReducer, useState } from 'react'
import { NetworkContext } from './context'
import { defaultNetworkState, networksReducer } from './reducer'
import { Network } from './model'
import { JsonRpcProvider, Web3Provider, ExternalProvider, Provider } from '@ethersproject/providers'
import { subscribeToProviderEvents } from '../../../helpers/eip1193'
import { getInjectedProvider } from '../../../helpers/injectedProvider'
import { useConfig } from '../../config'
import { useLocalStorage } from '../../../hooks'

interface NetworkProviderProps {
  children: ReactNode
  providerOverride?: JsonRpcProvider
}

async function tryToGetAccount(provider: JsonRpcProvider) {
  try {
    return await provider.getSigner().getAddress()
  } catch (err: any) {
    if (err.code === 'UNSUPPORTED_OPERATION') {
      // readonly provider
      return undefined
    }
    throw err
  }
}

export function NetworkProvider({ children, providerOverride }: NetworkProviderProps) {
  const { autoConnect, pollingInterval } = useConfig()
  const [network, dispatch] = useReducer(networksReducer, defaultNetworkState)
  const [onUnsubscribe, setOnUnsubscribe] = useState<() => void>(() => () => undefined)
  const [injectedProvider, setInjectedProvider] = useState<Web3Provider | undefined>()
  const [shouldConnectMetamask, setShouldConnectMetamask] = useLocalStorage('shouldConnectMetamask')

  const activateBrowserWallet = useCallback(async () => {
    if (!injectedProvider) {
      reportError(new Error('No injected provider available'))
      return
    }
    try {
      await injectedProvider.send('eth_requestAccounts', [])
    } catch (err: any) {
      reportError(err)
    }
    setShouldConnectMetamask(true)
    return activate(injectedProvider)
  }, [injectedProvider])

  useEffect(() => {
    if (providerOverride) {
      activate(providerOverride)
    }
  }, [providerOverride])

  useEffect(() => {
    // If window.ethereum._state.accounts is non null but has no items,
    // it probably means that the user has disconnected Metamask manually.
    if (shouldConnectMetamask && (window.ethereum as any)?._state?.accounts?.length === 0) {
      return
    }
    shouldConnectMetamask && autoConnect && injectedProvider && !providerOverride && activateBrowserWallet()
  }, [shouldConnectMetamask, autoConnect, injectedProvider, providerOverride])

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

  useEffect(function () {
    getInjectedProvider(pollingInterval).then(setInjectedProvider)
  }, [])

  const activate = useCallback(
    async (provider: JsonRpcProvider | ExternalProvider) => {
      const wrappedProvider = Provider.isProvider(provider) ? provider : new Web3Provider(provider)
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
      } catch (err: any) {
        reportError(err)
      }
    },
    [onUnsubscribe]
  )

  return (
    <NetworkContext.Provider
      value={{ network, update, activate, deactivate, reportError, activateBrowserWallet }}
      children={children}
    />
  )
}
