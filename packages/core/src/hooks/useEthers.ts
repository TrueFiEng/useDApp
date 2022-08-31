import { providers } from 'ethers'
import { getAddress } from 'ethers/lib/utils'
import { Connector, useConnector } from '../providers/network/connectors'
import { useConfig } from '../hooks'
import { useReadonlyNetwork } from './useReadonlyProvider'
import { useContext, useEffect, useState } from 'react'
import { useReadonlyNetworkStates } from '../providers/network/readonlyNetworks/context'

type JsonRpcProvider = providers.JsonRpcProvider

/**
 * @public
 */
export type Web3Ethers = {
  activate: (connector: Connector) => Promise<void>
  /**
   * @deprecated
   */
  setError: (error: Error) => void
  deactivate: () => void
  connector: undefined
  chainId?: number
  account?: string
  error?: Error
  library?: JsonRpcProvider
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
    connector,
    deactivate,
    activate,
    activateBrowserWallet,
    isLoading,
  } = useConnector()

  const [activeConnectorChainId, setActiveConnectorChainId] = useState<number | undefined>()
  const [errors, setErrors] = useState<Error[]>([])
  const [account, setAccount] = useState<string | undefined>()

  useEffect(() => {
    if (!connector) {
      return
    }

    setActiveConnectorChainId(connector.chainId)
    setErrors(connector.errors)
    if (connector.accounts[0]) {
      setAccount(getAddress(connector.accounts[0]))
    } else {
      setAccount(undefined)
    }

    return connector?.updated.on(({ chainId, errors, accounts }) => {
      setActiveConnectorChainId(chainId)
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
    const chainId = activeConnectorChainId
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
  }, [activeConnectorChainId, errors, networkStates])

  const readonlyNetwork = useReadonlyNetwork()
  const { provider, chainId } = connector?.getProvider()
    ? {
        provider: connector.getProvider(),
        chainId: activeConnectorChainId,
      }
    : {
        provider: readonlyNetwork?.provider as JsonRpcProvider | undefined,
        chainId: readonlyNetwork?.chainId,
      }

  return {
    connector: undefined,
    library: provider,
    chainId:
      error?.name === 'ChainIdError' ? undefined : provider !== undefined ? chainId : readonlyNetwork?.chainId,
    account,
    active: !!provider,
    activate,
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
