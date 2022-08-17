import { EventEmitter } from 'events'
import { Network } from '../providers'

export function subscribeToProviderEvents(
  provider: EventEmitter | undefined,
  onUpdate: (updatedNetwork: Partial<Network>) => void,
  onDisconnect: (error: Error) => void,
  onChainChanged?: (newChainId: number) => void
) {
  if (provider?.on) {
    const onConnectListener = (info: { chainId: string } | undefined): void => {
      if (info?.chainId) {
        onUpdate({ chainId: Number(info.chainId) })
      }
    }
    provider.on('connect', onConnectListener)

    const onDisconnectListener = (error: any): void => {
      onDisconnect(new Error(error))
    }
    provider.on('disconnect', onDisconnectListener)

    const onChainChangedListener = (chainId: string): void => {
      onChainChanged?.(Number(chainId))
      onUpdate({ chainId: Number(chainId) })
    }
    provider.on('chainChanged', onChainChangedListener)

    const onAccountsChangedListener = (accounts: string[]): void => {
      onUpdate({ accounts })
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
