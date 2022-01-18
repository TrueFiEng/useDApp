import { useEffect } from 'react'
import { useEthers } from '../hooks'
import { useConfig } from './config/context'
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'

export function NetworkActivator() {
  const { activate, chainId: connectedChainId, active } = useEthers()
  const { readOnlyChainId, readOnlyUrls, autoConnect } = useConfig()

  useEffect(() => {
    if (readOnlyChainId && readOnlyUrls) {
      if (!active && readOnlyUrls[readOnlyChainId] && connectedChainId !== readOnlyChainId) {
        const provider = new JsonRpcProvider(readOnlyUrls[readOnlyChainId])
        activate(provider)
      }
    }
  }, [readOnlyChainId, readOnlyUrls, active, connectedChainId])

  useEffect(() => {
    const eagerConnect = async () => {
      if ((window as any).ethereum) {
        const provider = new Web3Provider((window as any).ethereum)
        await provider.send('eth_requestAccounts', [])
        activate(provider)
      }
    }
    autoConnect && active && eagerConnect()
  }, [active])

  return null
}
