import { ReactNode, useCallback, useReducer } from 'react'
import { NetworkContext } from './context'
import { defaultNetworkState, networksReducer } from './reducer'
import { Network } from './model'

interface NetworkProviderProps {
  children: ReactNode
}

export function NetworkProvider({ children }: NetworkProviderProps) {
  const [network, dispatch] = useReducer(networksReducer, defaultNetworkState)

  const update = useCallback(
    (newNetwork: Partial<Network>) => {
      dispatch({ type: 'UPDATE_NETWORK', network: newNetwork })
    },
    [network]
  )

  const reportError = useCallback((error: Error | string) => {
    console.error(error)
    dispatch({ type: 'ADD_ERROR', error })
  }, [])

  return <NetworkContext.Provider value={{ network, update, reportError }} children={children} />
}
