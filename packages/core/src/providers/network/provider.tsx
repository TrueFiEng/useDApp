import { ReactNode, useCallback, useEffect, useReducer, useState } from 'react'
import { NetworkContext } from './context'
import { networksReducer } from './reducer'
import { Network } from './model'
import { getInjectedProvider, subscribeToInjectedProvider } from '../../helpers/injectedProvider'
import { Web3Provider } from '@ethersproject/providers'

interface NetworkProviderProps {
  children: ReactNode
}

export function NetworkProvider({ children }: NetworkProviderProps) {
  const [injectedProvider, setInjectedProvider] = useState<Web3Provider | undefined>()
  const [network, dispatch] = useReducer(networksReducer, {
    provider: undefined,
    chainId: undefined,
    accounts: []
  })

  const update = useCallback((newNetwork: Partial<Network>) => {
    dispatch({ type: 'UPDATE_NETWORK', network: newNetwork })
  }, [network])

  useEffect(function () {
    getInjectedProvider().then(setInjectedProvider)
  },
  [])

  useEffect(() => {
    const underlyingProvider: any = injectedProvider?.provider
    subscribeToInjectedProvider(underlyingProvider, update)
  }, [injectedProvider])

  return <NetworkContext.Provider value={{ network, update, injectedProvider }} children={children} />
}
