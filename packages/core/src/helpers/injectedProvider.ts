import detectEthereumProvider from '@metamask/detect-provider'
import { providers } from 'ethers'
import { isWebSocketProvider } from './isWebSocketProvider'

const GET_METAMASK_LINK = 'https://metamask.io/download.html'

export async function getInjectedProvider(getPollingInterval: (chaindId: number) => number) {
  if (!(window as any).ethereum) {
    window.open(GET_METAMASK_LINK)
    return undefined
  }

  const injectedProviders: any[] = (window as any)?.ethereum.providers || []
  const injectedProvider: any =
    injectedProviders.find((provider) => {
      return provider.isMetaMask ?? false
    }) ?? (await detectEthereumProvider())

  if (!injectedProvider) {
    window.open(GET_METAMASK_LINK)
    return undefined
  }

  const provider = new providers.Web3Provider(injectedProvider, 'any')
  const chainId = await provider.send('eth_chainId', [])
  if (!isWebSocketProvider(provider)) {
    provider.pollingInterval = getPollingInterval(chainId)
  }
  return provider
}
