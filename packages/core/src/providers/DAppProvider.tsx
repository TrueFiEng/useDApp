import { ReactNode, useMemo } from 'react'
import { Chain, Config } from '../constants'
import { ConfigProvider, useConfig } from './config'
import { BlockNumberProvider } from './blockNumber'
import { ChainStateProvider } from './chainState'
import { NotificationsProvider } from './notifications/provider'
import { NetworkActivator } from './NetworkActivator'
import { TransactionProvider } from './transactions/provider'
import { LocalMulticallProvider } from './LocalMulticallProvider'
import { NetworkProvider } from './network'
import { InjectedNetworkProvider } from './injectedNetwork'

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
    <NetworkProvider>
      <InjectedNetworkProvider>
        <BlockNumberProvider>
          <NetworkActivator />
          <LocalMulticallProvider>
            <ChainStateProvider multicallAddresses={multicallAddressesMerged}>
              <NotificationsProvider>
                <TransactionProvider>{children}</TransactionProvider>
              </NotificationsProvider>
            </ChainStateProvider>
          </LocalMulticallProvider>
        </BlockNumberProvider>
      </InjectedNetworkProvider>
    </NetworkProvider>
  )
}
