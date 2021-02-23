import { NetworkConnector } from '@web3-react/network-connector'
import { useEffect } from 'react'
import { ChainId } from '../constants'
import { useEthers } from '../hooks'
import { NodeUrls } from '../model'

interface ReadOnlyProviderActivatorProps {
  readOnlyChainId: ChainId
  readOnlyUrls: NodeUrls
}

export function ReadOnlyProviderActivator({ readOnlyChainId, readOnlyUrls }: ReadOnlyProviderActivatorProps) {
  const { activate, account, chainId: connectedChainId, active, connector } = useEthers()
  useEffect(() => {
    if (!active || (connector instanceof NetworkConnector && connectedChainId !== readOnlyChainId)) {
      activate(new NetworkConnector({ defaultChainId: readOnlyChainId, urls: readOnlyUrls || [] }))
    }
  }, [active, account, connectedChainId, connector])

  return null
}
