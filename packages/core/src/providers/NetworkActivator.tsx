import { useEffect, useState } from 'react'
import { useEthers } from '../hooks'
import { useConfig } from './config'
import { JsonRpcProvider } from '@ethersproject/providers'
import { useNetwork } from './network'

export function NetworkActivator() {
  const { activate, activateBrowserWallet, chainId: connectedChainId } = useEthers()
  const { readOnlyChainId, readOnlyUrls, autoConnect } = useConfig()
  const { injectedProvider } = useNetwork()
  const [readonlyConnected, setReadonlyConnected] = useState(false)

  useEffect(() => {
    if (readOnlyChainId && readOnlyUrls) {
      if (readOnlyUrls[readOnlyChainId] && connectedChainId !== readOnlyChainId) {
        const provider = new JsonRpcProvider(readOnlyUrls[readOnlyChainId])
        activate(provider).then(() => setReadonlyConnected(true))
      }
    }
  }, [readOnlyChainId, readOnlyUrls])

  useEffect(() => {
    autoConnect && injectedProvider && readonlyConnected && activateBrowserWallet()
  }, [injectedProvider, readonlyConnected])

  return null
}
