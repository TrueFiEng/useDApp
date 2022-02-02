import { ReactNode, useMemo } from 'react'
import { Chain, Config } from '../constants'
import { ConfigProvider, useConfig } from './config'
import { BlockNumberProvider } from './blockNumber/blockNumber'
import { ChainStateProvider, MultiChainStateProvider } from './chainState'
import { NotificationsProvider } from './notifications/provider'
import { NetworkActivator } from './NetworkActivator'
import { TransactionProvider } from './transactions/provider'
import { LocalMulticallProvider } from './LocalMulticallProvider'
import { NetworkProvider, InjectedNetworkProvider, ReadonlyNetworksProvider } from './network'
import { BlockNumbersProvider } from './blockNumber/blockNumbers'

interface DAppProviderProps {
  children: ReactNode
  config: Config
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

const getMulticallAddresses = (networks: Chain[] | undefined) => {
  const result: { [index: number]: string } = {}
  networks?.map((network) => (result[network.chainId] = network.multicallAddress))
  return result
}

function DAppProviderWithConfig({ children }: WithConfigProps) {
  const { multicallAddresses, networks } = useConfig()
  const defaultAddresses = useMemo(() => getMulticallAddresses(networks), [networks])
  const multicallAddressesMerged = { ...defaultAddresses, ...multicallAddresses }

  return (
    <ReadonlyNetworksProvider>
      <NetworkProvider>
        <InjectedNetworkProvider>
          <BlockNumberProvider>
            <BlockNumbersProvider>
              <NetworkActivator />
              <LocalMulticallProvider>
                <ChainStateProvider multicallAddresses={multicallAddressesMerged}>
                  <MultiChainStateProvider multicallAddresses={multicallAddressesMerged}>
                    <NotificationsProvider>
                      <TransactionProvider>{children}</TransactionProvider>
                    </NotificationsProvider>
                  </MultiChainStateProvider>
                </ChainStateProvider>
              </LocalMulticallProvider>
            </BlockNumbersProvider>
          </BlockNumberProvider>
        </InjectedNetworkProvider>
      </NetworkProvider>
    </ReadonlyNetworksProvider>
  )
}
