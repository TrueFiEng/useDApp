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
  onUpdate: (updatedNetwork: Partial<Network>) => void
) {
  if (provider?.on) {
    provider.on('connect', (all: any): void => {
      console.log(all)
      onUpdate({ chainId: Number(all.chainId) })
    })
    provider.on('disconnect', (error: any): void => {
      // todo handle error
      // actions.reportError(error)
    })
    provider.on('chainChanged', (chainId: string): void => {
      onUpdate({ chainId: Number(chainId) })
    })
    provider.on('accountsChanged', (accounts: string[]): void => {
      onUpdate({ accounts })
    })
  }
}
