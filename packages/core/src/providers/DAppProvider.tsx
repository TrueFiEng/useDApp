import { ReactNode } from 'react'
import { MULTICALL_ADDRESSES } from '../constants'
import { Config } from '../model/Config'
import { BlockNumberProvider } from './blockNumber/provider'
import { ChainStateProvider } from './chainState'
import { EthersProvider } from './EthersProvider'
import { ReadOnlyProviderActivator } from './ReadOnlyProviderActivator'

interface DAppProviderProps {
  children: ReactNode
  config: Config
}

export function DAppProvider({ config, children }: DAppProviderProps) {
  const multicallAddresses = { ...MULTICALL_ADDRESSES, ...config.multicallAddresses }

  return (
    <EthersProvider>
      <BlockNumberProvider>
        {config.readOnlyChain && config.readOnlyUrls && (
          <ReadOnlyProviderActivator chainId={config.readOnlyChain} nodeUrls={config.readOnlyUrls} />
        )}
        <ChainStateProvider multicallAddresses={multicallAddresses}>{children}</ChainStateProvider>
      </BlockNumberProvider>
    </EthersProvider>
  )
}
