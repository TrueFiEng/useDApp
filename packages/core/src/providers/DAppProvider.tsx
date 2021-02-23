import { ReactNode } from 'react'
import { MULTICALL_ADDRESSES } from '../constants'
import { Config } from '../model/config/Config'
import { ConfigProvider } from '../providers/config/provider'
import { BlockNumberProvider } from './blockNumber/provider'
import { ChainStateProvider } from './chainState'
import { useConfig } from './config/context'
import { EthersProvider } from './EthersProvider'
import { ReadOnlyProviderActivator } from './ReadOnlyProviderActivator'

interface DAppProviderProps {
  children: ReactNode
  config: Partial<Config>
}

export function DAppProvider({ config, children }: DAppProviderProps) {
  return (
    <ConfigProvider config={config}>
      <DAppProviderWithConfig>{children}</DAppProviderWithConfig>
    </ConfigProvider>
  )
}

interface WithConfigProps {
  children: ReactNode
}

function DAppProviderWithConfig({ children }: WithConfigProps) {
  const { multicallAddresses, readOnlyChainId, readOnlyUrls } = useConfig()
  const multicallAddressesMerged = { ...MULTICALL_ADDRESSES, ...multicallAddresses }
  return (
    <EthersProvider>
      <BlockNumberProvider>
        {readOnlyChainId && readOnlyUrls && (
          <ReadOnlyProviderActivator readOnlyChainId={readOnlyChainId} readOnlyUrls={readOnlyUrls} />
        )}
        <ChainStateProvider multicallAddresses={multicallAddressesMerged}>{children}</ChainStateProvider>
      </BlockNumberProvider>
    </EthersProvider>
  )
}
