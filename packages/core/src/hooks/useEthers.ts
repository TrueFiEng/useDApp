import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { ChainId } from '../constants'
import { useCallback } from 'react'
import { useConfig } from '../providers/config/context'
import { InjectedConnector } from '@web3-react/injected-connector'

type ActivateBrowserWallet = (onError?: (error: Error) => void, throwErrors?: boolean) => void

export type Web3Ethers = ReturnType<typeof useWeb3React> & {
  library?: Web3Provider
  chainId?: ChainId
  activateBrowserWallet: ActivateBrowserWallet
}

export function useEthers(): Web3Ethers {
  const result = useWeb3React<Web3Provider>()
  const { supportedChains } = useConfig()
  const activateBrowserWallet = useCallback<ActivateBrowserWallet>(
    async (onError, throwErrors) => {
      const injected = new InjectedConnector({ supportedChainIds: supportedChains })
      if (onError instanceof Function) {
        await result.activate(injected, onError, throwErrors)
      } else {
        await result.activate(injected, undefined, throwErrors)
      }
    },
    [supportedChains]
  )
  return { ...result, activateBrowserWallet }
}
