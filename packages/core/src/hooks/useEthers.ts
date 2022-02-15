import { useCallback } from 'react'
import { JsonRpcProvider } from '@ethersproject/providers'
import { useInjectedNetwork, useNetwork } from '../providers'
import { EventEmitter } from 'events'

type SupportedProviders =
  | JsonRpcProvider
  | EventEmitter
  | { getProvider: () => JsonRpcProvider | EventEmitter; activate: () => Promise<void> }

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

export function useEthers(): Web3Ethers {
  const {
    network: { provider, chainId, accounts, errors },
    deactivate,
    activate,
  } = useNetwork()
  const { injectedProvider, connect } = useInjectedNetwork()

  const result = {
    connector: undefined,
    library: provider,
    chainId,
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
    deactivate,

    setError: () => {
      throw new Error('setError is deprecated')
    },

    error: errors[errors.length - 1],
  }

  const activateBrowserWallet = useCallback(async () => {
    if (!injectedProvider) {
      return
    }
    await connect()
    await result.activate(injectedProvider)
  }, [injectedProvider])

  return { ...result, activateBrowserWallet }
}
