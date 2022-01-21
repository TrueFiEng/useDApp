import { Web3Provider } from '@ethersproject/providers'
import detectEthereumProvider from '@metamask/detect-provider'
import { EventEmitter } from 'events'
import { Network } from '../providers'

export async function getInjectedProvider() {
  const injectedProvider: any = await detectEthereumProvider()
  if (!injectedProvider) {
    return undefined
  }

  return new Web3Provider(injectedProvider, 'any')
}

export function subscribeToInjectedProvider(
  provider: EventEmitter | undefined,
  onUpdate: (updatedNetwork: Partial<Network>) => void,
  onError: (error: Error) => void
) {
  if (provider?.on) {
    const onConnectListener = ({ chainId }: { chainId: string }): void => {
      onUpdate({ chainId: Number(chainId) })
    }
    provider.on('connect', onConnectListener)

    const onDisconnectListener = (error: any): void => {
      onError(error)
    }
    provider.on('disconnect', onDisconnectListener)

    const onChainChangedListener = (chainId: string): void => {
      onUpdate({ chainId: Number(chainId) })
    }
    provider.on('chainChanged', onChainChangedListener)

    const onAccountsChangedListener = (accounts: string[]): void => {
      onUpdate({ accounts })
    }
    provider.on('accountsChanged', onAccountsChangedListener)

    return () => {
      provider.off('connect', onConnectListener)
      provider.off('disconnect', onDisconnectListener)
      provider.off('chainChanged', onChainChangedListener)
      provider.off('accountsChanged', onAccountsChangedListener)
    }
  }

  return () => undefined
}
