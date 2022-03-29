import { useCallback } from 'react'
import { ExternalProvider, JsonRpcProvider } from '@ethersproject/providers'
import { useConfig, useNetwork } from '../providers'
import { useLocalStorage } from './useLocalStorage'

type MaybePromise<T> = Promise<T> | any

type SupportedProviders =
  | JsonRpcProvider
  | ExternalProvider
  | { getProvider: () => MaybePromise<JsonRpcProvider | ExternalProvider>; activate: () => Promise<any> }

/**
 * @public
 */
export type Web3Ethers = {
  activate: (provider: SupportedProviders) => Promise<void>
  setError: (error: Error) => void
  deactivate: () => void
  connector: undefined
  chainId?: number
  account?: null | string
  error?: Error
  library?: JsonRpcProvider
  active: boolean
  activateBrowserWallet: () => void
}

/**
 * @public
 */
export function useEthers(): Web3Ethers {
  const {
    network: { provider, chainId, accounts, errors },
    deactivate,
    activate,
    injectedProvider, 
    connect
  } = useNetwork()
  const [, setShouldConnectMetamask] = useLocalStorage('shouldConnectMetamask')

  const { networks } = useConfig()
  const supportedChainIds = networks?.map((network) => network.chainId)
  const isUnsupportedChainId = chainId && supportedChainIds && supportedChainIds.indexOf(chainId) < 0
  const unsupportedChainIdError = new Error(
    `Unsupported chain id: ${chainId}. Supported chain ids are: ${supportedChainIds}.`
  )
  unsupportedChainIdError.name = 'UnsupportedChainIdError'
  const error = isUnsupportedChainId ? unsupportedChainIdError : errors[errors.length - 1]

  const result = {
    connector: undefined,
    library: provider,
    chainId: isUnsupportedChainId ? undefined : chainId,
    account: accounts[0],
    active: !!provider,
    activate: async (providerOrConnector: SupportedProviders) => {
      if ('getProvider' in providerOrConnector) {
        console.warn('Using web3-react connectors is deprecated and may lead to unexpected behavior.')
        await providerOrConnector.activate()
        return activate(await providerOrConnector.getProvider())
      }
      return activate(providerOrConnector)
    },
    deactivate: () => {
      deactivate()
      setShouldConnectMetamask(false)
    },

    setError: () => {
      throw new Error('setError is deprecated')
    },

    error,
  }

  const activateBrowserWallet = useCallback(async () => {
    if (!injectedProvider) {
      return
    }
    await connect()
    await result.activate(injectedProvider)
    setShouldConnectMetamask(true)
  }, [injectedProvider])

  return { ...result, activateBrowserWallet }
}
