import { Connector, ConnectorUpdateData } from '../connector'
import { providers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import { Event } from '../../../../helpers/event'

const GET_COINBASE_LINK = 'https://www.coinbase.com/wallet'

export async function getCoinbaseProvider() {
  if (!window.ethereum) {
    window.open(GET_COINBASE_LINK)
    return undefined
  }

  const injectedProviders: any[] = (window?.ethereum as any).providers || []
  const injectedProvider: any =
    injectedProviders.find((provider) => {
      return provider.isWalletLink ?? false
    }) ?? (await detectEthereumProvider())

  if (!injectedProvider || !injectedProvider.isWalletLink) {
    console.log(`Coinbase wallet is not installed - you can get it under ${GET_COINBASE_LINK}`)
    return undefined
  }

  const provider = new providers.Web3Provider(injectedProvider, 'any')
  return provider
}

export class CoinbaseWalletConnector implements Connector {
  public provider?: providers.Web3Provider
  public readonly name = 'CoinbaseWallet'

  readonly update = new Event<ConnectorUpdateData>()

  private async init() {
    if (this.provider) return
    const metamask = await getCoinbaseProvider()
    if (!metamask) {
      return
    }
    this.provider = metamask
  }

  async connectEagerly(): Promise<void> {
    await this.init()

    if (!this.provider) {
      return
    }

    try {
      const chainId: string = await this.provider!.send('eth_chainId', [])
      const accounts: string[] = await this.provider!.send('eth_accounts', [])
      this.update.emit({ chainId: parseInt(chainId), accounts })
    } catch (e) {
      console.debug(e)
    }
  }

  async activate(): Promise<void> {
    await this.init()

    if (!this.provider) {
      throw new Error('Could not activate connector')
    }

    try {
      const chainId: string = await this.provider!.send('eth_chainId', [])
      const accounts: string[] = await this.provider!.send('eth_requestAccounts', [])
      this.update.emit({ chainId: parseInt(chainId), accounts })
    } catch (e) {
      console.log(e)
      throw new Error('Could not activate connector')
    }
  }

  async deactivate(): Promise<void> {
    this.provider = undefined
  }
}
