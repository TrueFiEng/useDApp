import { ReactNode, useCallback, useEffect, useReducer, useState } from 'react'
import { NetworkContext } from './context'
import { defaultNetworkState, networkReducer } from './reducer'
import { Network } from './model'
import { providers } from 'ethers'
import { subscribeToProviderEvents, getInjectedProvider } from '../../../helpers'
import { useLocalStorage, useConfig } from '../../../hooks'
import detectEthereumProvider from '@metamask/detect-provider'

type JsonRpcProvider = providers.JsonRpcProvider
type ExternalProvider = providers.ExternalProvider
const Provider = providers.Provider
const Web3Provider = providers.Web3Provider

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
  const { autoConnect, pollingInterval, noMetamaskDeactivate, pollingIntervals } = useConfig()

  const [network, dispatch] = useReducer(networkReducer, defaultNetworkState)
  const [onUnsubscribe, setOnUnsubscribe] = useState<() => void>(() => () => undefined)
  const [shouldConnectMetamask, setShouldConnectMetamask] = useLocalStorage('shouldConnectMetamask')
  const [isLoading, setLoading] = useState(false)
  const getPollingInterval = useCallback((chainId: number) => pollingIntervals?.[chainId] ?? pollingInterval, [pollingInterval, pollingIntervals])

  const activateBrowserWallet = useCallback(async () => {
    setLoading(true)
    const injectedProvider = await getInjectedProvider(getPollingInterval)

    if (!injectedProvider) {
      reportError(new Error('No injected provider available'))
      setLoading(false)
      console.error('No injected provider available') // we do not want to crash the app when there is no metamask
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
      void activate(providerOverride)
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

  const onDisconnect = useCallback(
    (provider: JsonRpcProvider) => (error: any) => {
      const isMetaMask = (provider as any).provider.isMetaMask
      if (!noMetamaskDeactivate || !isMetaMask) {
        reportError(error)
        deactivate()
      }
    },
    []
  )

  useEffect(() => {
    setTimeout(async () => {
      try {
        if (shouldConnectMetamask && autoConnect && !providerOverride) {
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
        const clearSubscriptions = subscribeToProviderEvents(
          (wrappedProvider as any).provider,
          update,
          onDisconnect(wrappedProvider),
          (chainId) => { wrappedProvider.pollingInterval = getPollingInterval(chainId) }
        )
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
