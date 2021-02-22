import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import { ReactNode } from 'react'

const DEFAULT_POLLING_INTERVAL = 15000

interface EthersProviderProps {
  children: ReactNode
  pollingInterval?: number
}

export function EthersProvider({ children, pollingInterval }: EthersProviderProps) {
  function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider, 'any')
    library.pollingInterval = pollingInterval || DEFAULT_POLLING_INTERVAL
    return library
  }
  return <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
}
