import { providers } from 'ethers'
import { getAddress } from 'ethers/lib/utils'
import { getAddNetworkParams } from '../helpers/getAddNetworkParams'
import { validateArguments } from '../helpers/validateArgument'
import { ConnectorContext, ConnectorController, useNetwork } from '../providers'
import { useConfig } from '../hooks'
import { useContext } from 'react'

type JsonRpcProvider = providers.JsonRpcProvider
type ExternalProvider = providers.ExternalProvider
type Web3Provider = providers.Web3Provider

type MaybePromise<T> = Promise<T> | any

type SupportedProviders =
  | JsonRpcProvider
  | ExternalProvider
  | { getProvider: () => MaybePromise<JsonRpcProvider | ExternalProvider>; activate: () => Promise<any> }

interface ConnectorTag {
  tag: string
}

/**
 * @public
 */
export type Web3Ethers = {
  activate: (provider: ConnectorTag | SupportedProviders) => Promise<void>
  /**
   * @deprecated
   */
  setError: (error: Error) => void
  deactivate: () => void
  connector: ConnectorController | undefined
  chainId?: number
  account?: string
  error?: Error
  library?: Web3Provider | JsonRpcProvider | undefined
  active: boolean
  activateBrowserWallet: () => void
  isLoading: boolean
  /**
   * Switch to a different network.
   */
  switchNetwork: (chainId: number) => Promise<void>
}

/**
 * Returns connection state and functions that allow to manipulate the state.
 * **Requires**: `<ConfigProvider>`
 * 
 * @public
 * @returns {} Object with the following:
    - `account: string` - current user account (or *undefined* if not connected)
    - `chainId: ChainId` - current chainId (or *undefined* if not connected)
    - `library: Web3Provider` - an instance of ethers [Web3Provider](https://github.com/EthWorks/useDapp/tree/master/packages/example) (or `undefined` if not connected)
    - `active: boolean` - returns if provider is connected (read or write mode)
    - `activateBrowserWallet()` - function that will initiate connection to browser web3 extension (e.g. Metamask)
    - `async activate(connector: AbstractConnector, onError?: (error: Error) => void, throwErrors?: boolean)` - function that allows to connect to a wallet
    - `async deactivate()` - function that disconnects wallet
    - `error?: Error` - an error that occurred during connecting (e.g. connection is broken, unsupported network)
 */
export function useEthers(): Web3Ethers {
  const {
    network: { errors },
    deactivate,
    activate,
    activateBrowserWallet,
    isLoading,
  } = useNetwork()

  const { activeConnector } = useContext(ConnectorContext)!

  const { networks } = useConfig()
  const supportedChainIds = networks?.map((network) => network.chainId)
  const isUnsupportedChainId =
    activeConnector?.chainId && supportedChainIds && supportedChainIds.indexOf(activeConnector?.chainId) < 0
  const unsupportedChainIdError = new Error(
    `Unsupported chain id: ${activeConnector?.chainId}. Supported chain ids are: ${supportedChainIds}.`
  )
  unsupportedChainIdError.name = 'UnsupportedChainIdError'
  const error = isUnsupportedChainId ? unsupportedChainIdError : errors[errors.length - 1]

  const provider = activeConnector?.getProvider()

  const switchNetwork = async (chainId: number) => {
    validateArguments({ chainId }, { chainId: 'number' })

    if (!provider || !('send' in provider)) {
      throw new Error('Provider not connected.')
    }

    try {
      await (provider as any).send('wallet_switchEthereumChain', [{ chainId: `0x${chainId.toString(16)}` }])
    } catch (error: any) {
      const errChainNotAddedYet = 4902 // Metamask error code
      if (error.code === errChainNotAddedYet) {
        const chain = networks?.find((chain) => chain.chainId === chainId)
        if (chain?.rpcUrl) {
          await (provider as any).send('wallet_addEthereumChain', [getAddNetworkParams(chain)])
        }
      }
    }
  }

  const account = activeConnector?.accounts[0] ? getAddress(activeConnector?.accounts[0]) : undefined

  return {
    connector: activeConnector,
    library: provider,
    chainId: activeConnector?.chainId,
    account,
    active: !!activeConnector,
    activate: async (providerOrConnector: SupportedProviders | { tag: string }) => {
      if ('getProvider' in providerOrConnector) {
        console.warn('Using web3-react connectors is deprecated and may lead to unexpected behavior.')
        try {
          await providerOrConnector.activate()
        } catch (e) {
          console.log(e)
        }
        return activate(await providerOrConnector.getProvider())
      }
      return activate(providerOrConnector)
    },
    activateBrowserWallet,
    deactivate,
    setError: () => {
      throw new Error('setError is deprecated')
    },
    error,
    isLoading,
    switchNetwork,
  }
}
