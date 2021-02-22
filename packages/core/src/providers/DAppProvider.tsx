import { ReactNode } from 'react'
import { MULTICALL_ADDRESSES } from '../constants'
import { Config } from '../model/Config'
import { BlockNumberProvider } from './blockNumber/provider'
import { ChainStateProvider } from './chainState'
import { EthersProvider } from './EthersProvider'
import { ReadOnlyProviderActivator } from './ReadOnlyProviderActivator'
import { ConfigProvider } from '../providers/config/provider'

interface DAppProviderProps {
  children: ReactNode
  config: Partial<Config>
}

export function DAppProvider({ config, children }: DAppProviderProps) {
  const multicallAddresses = { ...MULTICALL_ADDRESSES, ...config.multicallAddresses }

  return (
    <ConfigProvider config={config}>
      <EthersProvider>
        <BlockNumberProvider>
          {config.readOnlyChain && config.readOnlyUrls && <ReadOnlyProviderActivator />}
          <ChainStateProvider multicallAddresses={multicallAddresses}>{children}</ChainStateProvider>
        </BlockNumberProvider>
      </EthersProvider>
    </ConfigProvider>
  )
}
