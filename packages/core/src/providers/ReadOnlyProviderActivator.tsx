import { NetworkConnector } from '@web3-react/network-connector'
import { useEffect } from 'react'
import { useEthers } from '../hooks'
import { useConfig } from './config/context'

export function ReadOnlyProviderActivator() {
  const { readOnlyChain, readOnlyUrls } = useConfig()
  const { activate, account, chainId: connectedChainId, active, connector } = useEthers()
  useEffect(() => {
    if (!active || (connector instanceof NetworkConnector && connectedChainId !== readOnlyChain)) {
      activate(new NetworkConnector({ defaultChainId: readOnlyChain, urls: readOnlyUrls || [] }))
    }
  }, [readOnlyChain, active, account, connectedChainId, connector])

  return null
}
