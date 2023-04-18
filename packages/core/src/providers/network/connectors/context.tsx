import { providers } from 'ethers'
import { getAddress } from 'ethers/lib/utils'
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useConfig, useLocalStorage, useReadonlyNetwork } from '../../../hooks'
import { useReadonlyNetworkStates } from '../readonlyNetworks/context'
import { Connector } from './connector'
import { ConnectorController } from './connectorController'
import { InjectedConnector } from './implementations'

type JsonRpcProvider = providers.JsonRpcProvider
type ExternalProvider = providers.ExternalProvider
type FallBackProvider = providers.FallbackProvider
const Provider = providers.Provider
type Web3Provider = providers.Web3Provider

export type ActivateBrowserWallet = (arg?: { type: string }) => void

type MaybePromise<T> = Promise<T> | T

type SupportedProviders =
  | JsonRpcProvider
  | ExternalProvider
  | { getProvider: () => MaybePromise<JsonRpcProvider | ExternalProvider>; activate: () => Promise<any> }
  | Connector

export type Web3Ethers = {
  activate: (provider: SupportedProviders) => Promise<void>
  /**
   * @deprecated
   */
  setError: (error: Error) => void
  deactivate: () => void
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

const getAccount = (connector: ConnectorController | undefined) => {
  if (connector?.accounts[0]) {
    return getAddress(connector.accounts[0])
  }
  return undefined
}

interface ConnectorContextValue extends Web3Ethers {
  connector: ConnectorController | undefined
  deactivate: () => void
  activateBrowserWallet: ActivateBrowserWallet
  reportError: (error: Error) => void
  isLoading: boolean
}

export const ConnectorContext = createContext<ConnectorContextValue>({
  connector: undefined,
  //eslint-disable-next-line @typescript-eslint/no-empty-function
  activate: async () => {},
  //eslint-disable-next-line @typescript-eslint/no-empty-function
  deactivate: () => {},
  //eslint-disable-next-line @typescript-eslint/no-empty-function
  activateBrowserWallet: () => {},
  //eslint-disable-next-line @typescript-eslint/no-empty-function
  reportError: () => {},
  isLoading: true,
  setError: () => {
    throw new Error('Function not implemented.')
  },
  active: false,
  switchNetwork: () => {
    throw new Error('Function not implemented.')
  },
})

export interface ConnectorContextProviderProps {
  children?: ReactNode
}

export interface ActivateOptions {
  silently?: boolean
  onSuccess?: () => void
}

export function ConnectorContextProvider({ children }: ConnectorContextProviderProps) {
  const [controller, setController] = useState<ConnectorController>()
  const [isLoading, setLoading] = useState(true)
  const config = useConfig()
  const { connectors, autoConnect } = config
  const [autoConnectTag, setAutoConnectTag] = useLocalStorage('usedapp:autoConnectTag')

  const activate = useCallback(
    async (
      providerOrConnector: JsonRpcProvider | ExternalProvider | Connector,
      { silently, onSuccess }: ActivateOptions = { silently: false }
    ) => {
      let controller: ConnectorController
      if ('activate' in providerOrConnector) {
        controller = new ConnectorController(providerOrConnector, config as any)
      } else {
        const wrappedProvider = Provider.isProvider(providerOrConnector)
          ? providerOrConnector
          : new providers.Web3Provider(providerOrConnector)
        controller = new ConnectorController(new InjectedConnector(wrappedProvider), config as any)
      }
      setLoading(true)
      setController(controller)
      try {
        if (silently) {
          await controller.activate((connector) => connector.connectEagerly())
        } else {
          await controller.activate()
        }

        setLoading(false)
        onSuccess?.()
      } catch (error) {
        controller.reportError(error as any)
      } finally {
        setLoading(false)
      }
    },
    [setController, setLoading]
  )

  const activateBrowserWallet: ActivateBrowserWallet = useCallback(
    async (options) => {
      // done for backward compatibility.
      // If the options object looks like an event object or is undefined,
      // it's not a valid option and will be ignored
      if (!options || typeof (options as any).preventDefault === 'function') {
        options = { type: 'metamask' }
      }
      const { type } = options
      if (!connectors[type]) {
        throw new Error(`Connector ${type} is not configured`)
      }
      await activate(connectors[type], {
        onSuccess: () => {
          setAutoConnectTag(type)
        },
      })
    },
    [activate, setAutoConnectTag, connectors]
  )

  const deactivate = useCallback(async () => {
    setAutoConnectTag(undefined)
    setLoading(true)
    setController(undefined)
    await controller?.deactivate()
    setLoading(false)
  }, [controller])

  const reportError: ConnectorContextValue['reportError'] = useCallback(
    (err) => {
      controller?.reportError(err)
    },
    [controller]
  )

  const switchNetwork = useCallback(
    async (chainId: number) => {
      await controller?.switchNetwork(chainId)
    },
    [controller]
  )

  const setErrorDeprecated = useCallback(() => {
    throw new Error('setError is deprecated')
  }, [])

  const ethersActivate = useCallback(async (providerOrConnector: SupportedProviders) => {
    if ('getProvider' in providerOrConnector) {
      console.warn('Using web3-react connectors is deprecated and may lead to unexpected behavior.')
      await providerOrConnector.activate()
      return activate(await providerOrConnector.getProvider())
    }
    return activate(providerOrConnector)
  }, [])

  useEffect(() => {
    if (autoConnect && autoConnectTag && connectors[autoConnectTag]) {
      void activate(connectors[autoConnectTag], {
        silently: true,
      })
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    controller?.updateConfig(config)
  }, [controller, config])

  const readonlyNetwork = useReadonlyNetwork()

  const [errors, setErrors] = useState<Error[]>(controller?.errors ?? [])
  const [account, setAccount] = useState<string | undefined>(getAccount(controller))
  const [provider, setProvider] = useState<JsonRpcProvider | Web3Provider | FallBackProvider | undefined>(
    controller?.getProvider()
  )
  const [chainId, setChainId] = useState<number | undefined>(controller?.chainId)

  useEffect(() => {
    if (!controller?.getProvider()) {
      setAccount(undefined)
      setProvider(readonlyNetwork?.provider as JsonRpcProvider | FallBackProvider | undefined)
      setChainId(readonlyNetwork?.chainId)
      setErrors([])
    } else {
      setChainId(controller.chainId)
      setErrors(controller.errors)
      setProvider(controller.getProvider())
      setAccount(getAccount(controller))
    }

    return controller?.updated.on(({ chainId, errors, accounts }) => {
      if (chainId) {
        setChainId(chainId)
        setProvider(controller.getProvider())
        if (accounts[0]) {
          setAccount(getAddress(accounts[0]))
        } else {
          setAccount(undefined)
        }
      }
      setErrors([...errors])
    })
  }, [controller, controller?.getProvider(), readonlyNetwork])

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

  return (
    <ConnectorContext.Provider
      value={{
        connector: controller,
        deactivate,
        reportError,
        activate: ethersActivate,
        activateBrowserWallet,
        isLoading,
        account,
        library: provider,
        chainId:
          error?.name === 'ChainIdError' ? undefined : provider !== undefined ? chainId : readonlyNetwork?.chainId,
        error,
        active: !!provider,
        switchNetwork,
        setError: setErrorDeprecated,
      }}
    >
      {children}
    </ConnectorContext.Provider>
  )
}

export const useConnector = () => useContext(ConnectorContext)
