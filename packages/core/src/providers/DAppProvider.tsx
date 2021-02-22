import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import { ReactNode } from 'react'
import { MULTICALL_ADDRESSES } from '../constants'
import { Config } from '../model/Config'
import { BlockNumberProvider } from './blockNumber/provider'
import { ChainStateProvider } from './chainState'
import { ReadOnlyProviderActivator } from './ReadOnlyProviderActivator'

interface DAppProviderProps {
  children: ReactNode
  config: Config
}

export function DAppProvider({ config, children }: DAppProviderProps) {
  const multicallAddresses = { ...MULTICALL_ADDRESSES, ...config.multicallAddresses }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BlockNumberProvider>
        {config.readOnlyChain && config.readOnlyUrls && (
          <ReadOnlyProviderActivator chainId={config.readOnlyChain} nodeUrls={config.readOnlyUrls} />
        )}
        <ChainStateProvider multicallAddresses={multicallAddresses}>{children}</ChainStateProvider>
      </BlockNumberProvider>
    </Web3ReactProvider>
  )
}

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider, 'any')
  library.pollingInterval = 15000
  return library
}
