import { useCallback } from 'react'
import { JsonRpcProvider } from '@ethersproject/providers'
import { ChainId } from '../constants'
import { useInjectedProvider, useNetwork } from '../providers'

export type Web3Ethers = {
  activate: (provider: JsonRpcProvider) => Promise<void>
  setError: (error: Error) => void
  deactivate: () => void
  connector: undefined
  chainId?: ChainId
  account?: null | string
  error?: Error
  library?: JsonRpcProvider
  active: boolean
  activateBrowserWallet: () => void
}

async function tryToGetAccount(provider: JsonRpcProvider) {
  try {
    return await provider.getSigner().getAddress()
  } catch (e) {
    if (e.code === 'UNSUPPORTED_OPERATION') {
      return undefined
    }
    throw e
  }
}

export function useEthers(): Web3Ethers {
  const {
    network: { provider, chainId, accounts, errors },
    update,
    reportError,
  } = useNetwork()
  const { injectedProvider, connect } = useInjectedProvider()

  const result = {
    connector: undefined,
    library: provider,
    chainId,
    account: accounts[0],
    active: !!provider,
    activate: async (provider: JsonRpcProvider) => {
      try {
        const account = await tryToGetAccount(provider)
        const chainId = (await provider?.getNetwork())?.chainId
        update({
          provider,
          chainId,
          accounts: account ? [account] : [],
        })
      } catch (e) {
        reportError(e)
      }
    },

    setError: () => undefined,
    deactivate: () => {
      update({
        provider,
        chainId,
        accounts: [],
      })
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
