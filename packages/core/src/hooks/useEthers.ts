import { useWeb3React } from '@web3-react/core'
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { ChainId } from '../constants'
import { useCallback, useState } from 'react'
import { useConfig } from '../providers/config/context'
import { InjectedConnector } from '@web3-react/injected-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'

type ActivateBrowserWallet = (onError?: (error: Error) => void, throwErrors?: boolean) => void

// state, reducer with provider, library?
// activate

export type Web3Ethers = {
  activate: (connector: AbstractConnector, onError?: (error: Error) => void, throwErrors?: boolean) => Promise<void>;
  setError: (error: Error) => void;
  deactivate: () => void;
  connector?: AbstractConnector;
  chainId?: ChainId;
  account?: null | string;
  error?: Error;
  library?: Web3Provider;
  active: boolean;
  activateBrowserWallet: ActivateBrowserWallet
}

export function useEthers(): Web3Ethers {
  const { networks } = useConfig()
  const [result, setResult] = useState<Omit<Web3Ethers, 'activateBrowserWallet'>>({
    connector: undefined,
    library: undefined,
    chainId: ChainId.Mainnet,
    account: null,

    activate: async (connector: AbstractConnector, onError?: (error: Error) => void, throwErrors?: boolean) => {
      console.log('AAAAAAA')
      setResult({
        ...result,
        library: await connector.getProvider(),
        chainId: Number(await connector.getChainId()),
        account: await connector.getAccount(),
        active: true,
      })
    },
    setError: (error: Error) => { },
    deactivate: () => { },

    active: false,
    error: undefined
  })

  const activateBrowserWallet = useCallback<ActivateBrowserWallet>(
    async (onError, throwErrors) => {
      const injected = new InjectedConnector({ supportedChainIds: networks?.map((network) => network.chainId) })
      console.log('DUPA')
      if (onError instanceof Function) {
        await result.activate(injected, onError, throwErrors)
      } else {
        await result.activate(injected, undefined, throwErrors)
      }
    },
    [networks]
  )
  return { ...result, activateBrowserWallet }
}
