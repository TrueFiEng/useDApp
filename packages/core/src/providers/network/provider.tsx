import { ReactNode, useCallback, useReducer } from 'react'
import { NetworkContext } from './context'
import { networksReducer } from './reducer'
import { Network } from './model'

interface NetworkProviderProps {
  children: ReactNode
}

export function NetworkProvider({ children }: NetworkProviderProps) {
  const [network, dispatch] = useReducer(networksReducer, {
    provider: undefined,
    chainId: undefined,
    accounts: []
  })

  const update = useCallback((newNetwork: Partial<Network>) => {
    dispatch({ type: 'UPDATE_NETWORK', network: newNetwork })
  }, [network])


  return <NetworkContext.Provider value={{ network, update }} children={children} />
}
