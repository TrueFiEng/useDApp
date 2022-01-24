import { useEffect, useState } from 'react'
import { useEthers } from '../hooks'
import { useConfig } from './config'
import { JsonRpcProvider } from '@ethersproject/providers'
import { useInjectedProvider } from './injectedProvider'

interface NetworkActivatorProps {
  providerOverride?: JsonRpcProvider
}

export function NetworkActivator({ providerOverride }: NetworkActivatorProps) {
  const { activate, activateBrowserWallet, chainId: connectedChainId } = useEthers()
  const { readOnlyChainId, readOnlyUrls, autoConnect, pollingInterval } = useConfig()
  const injectedProvider = useInjectedProvider()
  const [readonlyConnected, setReadonlyConnected] = useState(false)

  useEffect(() => {
    if (providerOverride) {
      activate(providerOverride).then(() => undefined)
    }
  }, [providerOverride])

  useEffect(() => {
    if (readOnlyChainId && readOnlyUrls && !providerOverride) {
      if (readOnlyUrls[readOnlyChainId] && connectedChainId !== readOnlyChainId) {
        const provider = new JsonRpcProvider(readOnlyUrls[readOnlyChainId])
        provider.pollingInterval = pollingInterval
        activate(provider).then(() => setReadonlyConnected(true))
      }
    }
  }, [readOnlyChainId, readOnlyUrls])

  useEffect(() => {
    autoConnect && injectedProvider && !providerOverride && readonlyConnected && activateBrowserWallet()
  }, [injectedProvider, readonlyConnected])

  return null
}
