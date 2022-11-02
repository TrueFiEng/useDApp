import { providers } from 'ethers'
import { getAddress } from 'ethers/lib/utils'
import { Connector, ConnectorController, useConnector } from '../providers/network/connectors'
import { useConfig } from '../hooks'
import { useReadonlyNetwork } from './useReadonlyProvider'
import { useEffect, useState } from 'react'
import { useReadonlyNetworkStates } from '../providers/network/readonlyNetworks/context'
import { ActivateBrowserWallet } from '../providers/network/connectors/context'

type JsonRpcProvider = providers.JsonRpcProvider
type Web3Provider = providers.Web3Provider
type ExternalProvider = providers.ExternalProvider
type FallBackProvider = providers.FallbackProvider

type MaybePromise<T> = Promise<T> | T

type SupportedProviders =
  | JsonRpcProvider
  | ExternalProvider
  | { getProvider: () => MaybePromise<JsonRpcProvider | ExternalProvider>; activate: () => Promise<any> }
  | Connector

/**
 * useEthers return type.
 */
export type Web3Ethers = {
  activate: (provider: SupportedProviders) => Promise<void>
  /**
   * @deprecated
   */
  setError: (error: Error) => void
  deactivate: () => void
  connector: undefined
  chainId?: number
  account?: string
  error?: Error
  library?: JsonRpcProvider | FallBackProvider
  active: boolean
  activateBrowserWallet: ActivateBrowserWallet
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
    - `library: Web3Provider` - an instance of ethers [Web3Provider](https://github.com/TrueFiEng/useDApp/tree/master/packages/example) (or `undefined` if not connected)
    - `active: boolean` - returns if provider is connected (read or write mode)
    - `activateBrowserWallet()` - function that will initiate connection to browser web3 extension (e.g. Metamask)
    - `async activate(connector: AbstractConnector, onError?: (error: Error) => void, throwErrors?: boolean)` - function that allows to connect to a wallet
    - `async deactivate()` - function that disconnects wallet
    - `error?: Error` - an error that occurred during connecting (e.g. connection is broken, unsupported network)
 */
export function useEthers(): Web3Ethers {
  const { connector, deactivate, activate, activateBrowserWallet, isLoading } = useConnector()
  const readonlyNetwork = useReadonlyNetwork()

  const [errors, setErrors] = useState<Error[]>(connector?.errors ?? [])
  const [account, setAccount] = useState<string | undefined>(getAccount(connector))
  const [provider, setProvider] = useState<JsonRpcProvider | Web3Provider | FallBackProvider | undefined>(
    connector?.getProvider()
  )
  const [chainId, setChainId] = useState<number | undefined>(connector?.chainId)

  useEffect(() => {
    if (!connector?.getProvider()) {
      setAccount(undefined)
      setProvider(readonlyNetwork?.provider as JsonRpcProvider | FallBackProvider | undefined)
      setChainId(readonlyNetwork?.chainId)
      setErrors([])
      return
    }

    setChainId(connector.chainId)
    setErrors(connector.errors)
    setProvider(connector.getProvider())
    setAccount(getAccount(connector))

    return connector.updated.on(({ chainId, errors, accounts }) => {
      setChainId(chainId)
      setErrors(errors)
      if (accounts[0]) {
        setAccount(getAddress(accounts[0]))
      } else {
        setAccount(undefined)
      }
    })
  }, [connector])

  const { networks, readOnlyUrls } = useConfig()
  const [error, setError] = useState<Error | undefined>(undefined)

  const networkStates = useReadonlyNetworkStates()

  const configuredChainIds = Object.keys(readOnlyUrls || {}).map((chainId) => parseInt(chainId, 10))
  const supportedChainIds = networks?.map((network) => network.chainId)

  useEffect(() => {
    const isNotConfiguredChainId = chainId && configuredChainIds && configuredChainIds.indexOf(chainId) < 0
    const isUnsupportedChainId = chainId && supportedChainIds && supportedChainIds.indexOf(chainId) < 0

    if (isUnsupportedChainId || isNotConfiguredChainId) {
      const chainIdError = new Error(`${isUnsupportedChainId ? 'Unsupported' : 'Not configured'} chain id: ${chainId}.`)
      chainIdError.name = 'ChainIdError'
      setError(chainIdError)
      return
    }

    for (const networkState of Object.values(networkStates)) {
      if (networkState.errors.length > 0) {
        setError(networkState.errors[networkState.errors.length - 1])
        return
      }
    }

    setError(errors?.[errors.length - 1])
  }, [chainId, errors, networkStates])

  return {
    connector: undefined,
    library: provider,
    chainId: error?.name === 'ChainIdError' ? undefined : provider !== undefined ? chainId : readonlyNetwork?.chainId,
    account,
    active: !!provider,
    activate: async (providerOrConnector: SupportedProviders) => {
      if ('getProvider' in providerOrConnector) {
        console.warn('Using web3-react connectors is deprecated and may lead to unexpected behavior.')
        await providerOrConnector.activate()
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
    switchNetwork: async (chainId: number) => {
      await connector?.switchNetwork(chainId)
    },
  }
}

const getAccount = (connector: ConnectorController | undefined) => {
  if (connector?.accounts[0]) {
    return getAddress(connector.accounts[0])
  }
  return undefined
}
