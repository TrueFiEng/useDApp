import { EventEmitter } from 'events'
import { ConnectorController } from '../providers/network/connector/connectorController'

export function subscribeToProviderEvents(connector: ConnectorController) {
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
      provider.removeListener('connect', onConnectListener)
      provider.removeListener('disconnect', onDisconnectListener)
      provider.removeListener('chainChanged', onChainChangedListener)
      provider.removeListener('accountsChanged', onAccountsChangedListener)
    }
  }

  return () => undefined
}
