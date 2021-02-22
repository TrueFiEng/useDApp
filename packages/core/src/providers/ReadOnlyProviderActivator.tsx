import { useEffect } from 'react'
import { NetworkConnector } from '@web3-react/network-connector'
import { ChainId } from '../constants'
import { useEthers } from '../hooks'
import { NodeUrls } from '../model/Config'

interface ReadOnlyProviderActivatorProps {
  chainId: ChainId
  nodeUrls: NodeUrls
}

export function ReadOnlyProviderActivator({ chainId, nodeUrls }: ReadOnlyProviderActivatorProps) {
  const { activate, account, chainId: connectedChainId, active, connector } = useEthers()

  useEffect(() => {
    if (!active || (connector instanceof NetworkConnector && connectedChainId !== chainId)) {
      activate(new NetworkConnector({ defaultChainId: chainId, urls: nodeUrls }))
    }
  }, [chainId, active, account, connectedChainId, connector])

  return null
}
