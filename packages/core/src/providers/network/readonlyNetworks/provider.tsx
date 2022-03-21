import { ReactNode, useEffect, useState } from 'react'
import { JsonRpcProvider } from '@ethersproject/providers'
import { useConfig } from '../../config'
import { ReadonlyNetworksContext } from './context'
import { NodeUrls } from '../../../constants'
import { fromEntries } from '../../../helpers/fromEntries'

interface NetworkProviderProps {
  providerOverrides?: Record<number, JsonRpcProvider>
  children?: ReactNode
}

export const getProvidersFromConfig = (readOnlyUrls: NodeUrls) =>
  fromEntries(Object.entries(readOnlyUrls).map(([chainId, url]) => [chainId, new JsonRpcProvider(url)]))

export function ReadonlyNetworksProvider({ providerOverrides = {}, children }: NetworkProviderProps) {
  const { readOnlyUrls = {} } = useConfig()

  const [providers, setProviders] = useState<Record<number, JsonRpcProvider>>({})

  const setProvider = (chainId: number, provider: JsonRpcProvider) => setProviders((prevProviders) => ({ ...prevProviders, [chainId]: provider }))

  function connect(chainId: number): boolean {
    if(providers[chainId]) return true;

    if(providerOverrides[chainId]) {
      setProvider(chainId, providerOverrides[chainId])
      return true;
    }

    if(readOnlyUrls[chainId]) {
      const provider = new JsonRpcProvider(readOnlyUrls[chainId])
      setProvider(chainId, provider)
      return true;
    }

    // TODO: Try to use default ethers provider here.

    return false;
  }

  useEffect(() => {
    for(const chainId in Object.keys(readOnlyUrls)) {
      if(providers[chainId] && !providerOverrides[chainId]) {
        const provider = new JsonRpcProvider(readOnlyUrls[chainId])
        setProvider(+chainId, provider)
      }
    }
  }, [JSON.stringify(readOnlyUrls)])

  return (
    <ReadonlyNetworksContext.Provider value={{
      providers,
      connect,
    }}>
      {children}
    </ReadonlyNetworksContext.Provider>
  )
}
