import { ReactNode, useCallback, useEffect, useReducer, useState } from 'react'
import { NetworkContext } from './context'
import { defaultNetworkState, networksReducer } from './reducer'
import { Network } from './model'
import { JsonRpcProvider, Web3Provider, ExternalProvider, Provider } from '@ethersproject/providers'
import { subscribeToProviderEvents, getInjectedProvider } from '../../../helpers'
import { useConfig } from '../../config'
import { useLocalStorage } from '../../../hooks'
import detectEthereumProvider from '@metamask/detect-provider'

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

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function NetworkProvider({ children, providerOverride }: NetworkProviderProps) {
  const { autoConnect, pollingInterval } = useConfig()

  const [network, dispatch] = useReducer(networksReducer, defaultNetworkState)
  const [onUnsubscribe, setOnUnsubscribe] = useState<() => void>(() => () => undefined)
  const [shouldConnectMetamask, setShouldConnectMetamask] = useLocalStorage('shouldConnectMetamask')
  const [isLoading, setLoading] = useState(false)

  const activateBrowserWallet = useCallback(async () => {
    setLoading(true)
    const injectedProvider = await getInjectedProvider(pollingInterval)

    if (!injectedProvider) {
      reportError(new Error('No injected provider available'))
      setLoading(false)
      return
    }
    try {
      await injectedProvider.send('eth_requestAccounts', [])
      setShouldConnectMetamask(true)
    } catch (err: any) {
      reportError(err)
      setShouldConnectMetamask(false)
      throw err
    } finally {
      setLoading(false)
    }
    return activate(injectedProvider)
  }, [])

  useEffect(() => {
    if (providerOverride) {
      activate(providerOverride)
    }
  }, [providerOverride])
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
    setShouldConnectMetamask(false)
    update({
      accounts: [],
    })
  }, [])

  const onDisconnect = useCallback((error) => {
    deactivate()
    reportError(error)
  }, [])

  useEffect(() => {
    setTimeout(async () => {
      try {
        if(shouldConnectMetamask && autoConnect && !providerOverride) {
          await detectEthereumProvider()
  
          // If window.ethereum._state.accounts is non null but has no items,
          // it probably means that the user has disconnected Metamask manually.
          if (shouldConnectMetamask && (window.ethereum as any)?._state?.accounts?.length === 0) {
            return
          }

          await activateBrowserWallet()
        }
      } catch (err) {
        console.warn(err)
      }
    })
  }, [shouldConnectMetamask, autoConnect, providerOverride])

  const activate = useCallback(
    async (provider: JsonRpcProvider | ExternalProvider) => {
      const wrappedProvider = Provider.isProvider(provider) ? provider : new Web3Provider(provider)
      try {
        setLoading(true)
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
        throw err
      } finally {
        setLoading(false)
      }
    },
    [onUnsubscribe]
  )
  return (
    <NetworkContext.Provider
      value={{ network, update, activate, deactivate, reportError, activateBrowserWallet, isLoading }}
      children={children}
    />
  )
}
