import detectEthereumProvider from '@metamask/detect-provider'
import { providers } from 'ethers'

const GET_METAMASK_LINK = 'https://metamask.io/download.html'

export async function getMetamaskProvider() {
  if (!window.ethereum) {
    window.open(GET_METAMASK_LINK)
    return undefined
  }

  const injectedProviders: any[] = (window?.ethereum as any).providers || []
  const injectedProvider: any =
    injectedProviders.find((provider) => {
      return provider.isMetaMask ?? false
    }) ?? (await detectEthereumProvider())

  if (!injectedProvider) {
    window.open(GET_METAMASK_LINK)
    return undefined
  }

  const provider = new providers.Web3Provider(injectedProvider, 'any')
  return provider
}
