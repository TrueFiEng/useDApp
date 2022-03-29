import { useEffect, useState } from 'react'
import { useEthers, useLocalStorage } from '../hooks'
import { useConfig } from './config'
import { JsonRpcProvider, Provider } from '@ethersproject/providers'
import { useNetwork } from './network/network'

interface NetworkActivatorProps {
  providerOverride?: JsonRpcProvider
}

export function NetworkActivator({ providerOverride }: NetworkActivatorProps) {
  const { activate, activateBrowserWallet, chainId: connectedChainId } = useEthers()
  const { readOnlyChainId, readOnlyUrls, autoConnect, pollingInterval } = useConfig()
  const injectedProvider = useNetwork()
  const [shouldConnectMetamask] = useLocalStorage('shouldConnectMetamask')
  const [readonlyConnected, setReadonlyConnected] = useState(false)

  useEffect(() => {
    if (providerOverride) {
      activate(providerOverride)
    }
  }, [providerOverride])

  useEffect(() => {
    if (readOnlyChainId && readOnlyUrls && !providerOverride) {
      if (readOnlyUrls[readOnlyChainId] && connectedChainId !== readOnlyChainId) {
        const urlOrProvider = readOnlyUrls[readOnlyChainId]
        const provider = Provider.isProvider(urlOrProvider) ? urlOrProvider : new JsonRpcProvider(urlOrProvider)
        provider.pollingInterval = pollingInterval
        if (provider instanceof JsonRpcProvider) {
          activate(provider).then(() => setReadonlyConnected(true))
        }
      }
    }
  }, [readOnlyChainId, readOnlyUrls])

  useEffect(() => {
    shouldConnectMetamask &&
      autoConnect &&
      injectedProvider &&
      !providerOverride &&
      readonlyConnected &&
      activateBrowserWallet()
  }, [readonlyConnected])

  return null
}
