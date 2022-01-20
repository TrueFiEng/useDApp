import { ReactNode, useCallback, useEffect, useState } from 'react'
import { InjectedProviderContext } from './context'
import { Web3Provider } from '@ethersproject/providers'
import { getInjectedProvider, subscribeToInjectedProvider } from '../../helpers/injectedProvider'
import { useNetwork } from '../network'

interface InjectedProviderProviderProps {
  children: ReactNode
}

export function InjectedProviderProvider({ children }: InjectedProviderProviderProps) {
  const { update } = useNetwork()
  const [injectedProvider, setInjectedProvider] = useState<Web3Provider | undefined>()

  useEffect(function () {
    getInjectedProvider().then(setInjectedProvider)
  }, [])

  useEffect(() => {
    const underlyingProvider: any = injectedProvider?.provider
    subscribeToInjectedProvider(underlyingProvider, update)
  }, [injectedProvider])

  const connect = useCallback(async () => {
    if (!injectedProvider) {
      //todo error
      return
    }
    try {
      await injectedProvider.send('eth_requestAccounts', [])
    } catch (e) {
      // todo error
    }
    return injectedProvider
  }, [injectedProvider])

  return <InjectedProviderContext.Provider value={{
    injectedProvider,
    connect
  }} children={children} />
}
