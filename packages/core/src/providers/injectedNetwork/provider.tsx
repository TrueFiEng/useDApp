import { ReactNode, useCallback, useEffect, useState } from 'react'
import { InjectedNetworkContext } from './context'
import { Web3Provider } from '@ethersproject/providers'
import { getInjectedProvider } from '../../helpers/injectedProvider'
import { useNetwork } from '../network'
import { useConfig } from '../config'

interface InjectedNetworkProviderProps {
  children: ReactNode
}

export function InjectedNetworkProvider({ children }: InjectedNetworkProviderProps) {
  const { reportError } = useNetwork()
  const { pollingInterval } = useConfig()
  const [injectedProvider, setInjectedProvider] = useState<Web3Provider | undefined>()

  useEffect(function () {
    getInjectedProvider(pollingInterval).then(setInjectedProvider)
  }, [])

  const connect = useCallback(async () => {
    if (!injectedProvider) {
      reportError(new Error('No injected provider available'))
      return
    }
    try {
      await injectedProvider.send('eth_requestAccounts', [])
      return injectedProvider
    } catch (e: any) {
      reportError(e)
    }
  }, [injectedProvider])

  return (
    <InjectedNetworkContext.Provider
      value={{
        injectedProvider,
        connect,
      }}
      children={children}
    />
  )
}
