import { Web3Provider } from '@ethersproject/providers'
import detectEthereumProvider from '@metamask/detect-provider'

export async function getInjectedProvider(pollingInterval: number) {
  const injectedProvider: any = await detectEthereumProvider()
  if (!injectedProvider) {
    return undefined
  }

  const provider = new Web3Provider(injectedProvider, 'any')
  provider.pollingInterval = pollingInterval
  return provider
}
