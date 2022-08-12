import { EventEmitter } from 'events'
import { ConnectorController } from '../providers/network/connector/connectorController'
import { Network } from '../providers/network/network/model'

export function subscribeToProviderEvents(
  connector: ConnectorController,
  onUpdate: (updatedNetwork: Partial<Network>) => void
) {
  const connectorUnsub = connector.updated.on(({ chainId, accounts }) => {
    onUpdate({ chainId, accounts })
  })

  const provider: EventEmitter | undefined = (connector.getProvider() as any).provider
  if (provider?.on) {
    const onConnectListener = (): void => {
      void connector.connector.activate()
    }
    provider.on('connect', onConnectListener)

    const onDisconnectListener = (): void => {
      void connector.connector.deactivate()
    }
    provider.on('disconnect', onDisconnectListener)

    const onChainChangedListener = (chainId: string): void => {
      void connector.connector.onUpdate?.({ chainId: parseInt(chainId), accounts: connector.accounts })
    }
    provider.on('chainChanged', onChainChangedListener)

    const onAccountsChangedListener = (accounts: string[]): void => {
      void connector.connector.onUpdate?.({ chainId: connector.chainId, accounts })
    }
    provider.on('accountsChanged', onAccountsChangedListener)

    return () => {
      connectorUnsub()

      if (connector.connector.name === 'Fortmatic') {
        return
      }
      provider.removeListener('connect', onConnectListener)
      provider.removeListener('disconnect', onDisconnectListener)
      provider.removeListener('chainChanged', onChainChangedListener)
      provider.removeListener('accountsChanged', onAccountsChangedListener)
    }
  }

  return () => undefined
}
