import { JsonRpcProvider, Provider, Web3Provider } from '@ethersproject/providers'
import { ChainId } from '../constants'
import { useCallback } from 'react'
import { useConfig } from '../providers/config/context'
import { useNetwork } from '../providers/network'

type ActivateBrowserWallet = (onError?: (error: Error) => void, throwErrors?: boolean) => void

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
  activateBrowserWallet: ActivateBrowserWallet
}

async function tryToGetAccount(provider: JsonRpcProvider) {
  try {
    return await provider.getSigner().getAddress()
  } catch {
    return undefined
  }
}

export function useEthers(): Web3Ethers {
  const { networks } = useConfig()
  const {
    network: { provider, chainId, accounts },
    update,
  } = useNetwork()

  const result = {
    connector: undefined,
    library: provider,
    chainId,
    account: accounts[0],
    active: !!provider,
    activate: async (provider: JsonRpcProvider) => {
      const account = await tryToGetAccount(provider)
      const chainId = (await provider?.getNetwork())?.chainId
      update({
        provider,
        chainId,
        accounts: account ? [account] : [],
      })
    },

    setError: () => undefined,
    deactivate: () => {
      update({
        provider,
        chainId,
        accounts: [],
      })
    },

    error: undefined,
  }

  const activateBrowserWallet = useCallback<ActivateBrowserWallet>(async () => {
    const provider = new Web3Provider((window as any).ethereum)
    await provider.send('eth_requestAccounts', [])
    await result.activate(provider)
  }, [networks])
  return { ...result, activateBrowserWallet }
}
