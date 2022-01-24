import { ReactNode, useCallback, useEffect, useState } from 'react'
import { InjectedProviderContext } from './context'
import { Web3Provider } from '@ethersproject/providers'
import { getInjectedProvider, subscribeToInjectedProvider } from '../../helpers/injectedProvider'
import { useNetwork } from '../network'
import { useConfig } from '../config'

interface InjectedProviderProviderProps {
  children: ReactNode
}

export function InjectedProviderProvider({ children }: InjectedProviderProviderProps) {
  const { update, reportError } = useNetwork()
  const { pollingInterval } = useConfig()
  const [injectedProvider, setInjectedProvider] = useState<Web3Provider | undefined>()

  useEffect(function () {
    getInjectedProvider(pollingInterval).then(setInjectedProvider)
  }, [])

  useEffect(() => {
    const underlyingProvider: any = injectedProvider?.provider
    return subscribeToInjectedProvider(underlyingProvider, update, reportError)
  }, [injectedProvider])

  const connect = useCallback(async () => {
    if (!injectedProvider) {
      reportError('No injected provider available')
      return
    }
    try {
      await injectedProvider.send('eth_requestAccounts', [])
      return injectedProvider
    } catch (e) {
      reportError(e)
    }
  }, [injectedProvider])

  return (
    <InjectedProviderContext.Provider
      value={{
        injectedProvider,
        connect,
      }}
      children={children}
    />
  )
}
