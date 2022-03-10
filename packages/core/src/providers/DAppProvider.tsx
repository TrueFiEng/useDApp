import { ReactNode, useMemo } from 'react'
import { Config, Chain } from '../constants'
import { ConfigProvider } from './config'
import { BlockNumberProvider } from './blockNumber/blockNumber'
import { ChainStateProvider, MultiChainStateProvider } from './chainState'
import { useConfig } from './config/context'
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
  networks?.forEach((network) => (result[network.chainId] = network.multicallAddress))
  return result
}

const getMulticall2Addresses = (networks: Chain[] | undefined) => {
  const result: { [index: number]: string } = {}
  networks?.forEach((network) => {
    if (network.multicall2Address) {
      result[network.chainId] = network.multicall2Address
    }
  })
  return result
}

function DAppProviderWithConfig({ children }: WithConfigProps) {
  const { multicallAddresses, networks, multicallVersion } = useConfig()
  const defaultAddresses = useMemo(
    () => (multicallVersion === 1 ? getMulticallAddresses(networks) : getMulticall2Addresses(networks)),
    [networks, multicallVersion]
  )
  const multicallAddressesMerged = { ...defaultAddresses, ...multicallAddresses }

  return (
    <ReadonlyNetworksProvider>
      <NetworkProvider>
        <InjectedNetworkProvider>
          <BlockNumberProvider>
            <BlockNumbersProvider>
              <NetworkActivator />
              <LocalMulticallProvider>
                <MultiChainStateProvider multicallAddresses={multicallAddressesMerged}>
                  <NotificationsProvider>
                    <TransactionProvider>{children}</TransactionProvider>
                  </NotificationsProvider>
                </MultiChainStateProvider>
              </LocalMulticallProvider>
            </BlockNumbersProvider>
          </BlockNumberProvider>
        </InjectedNetworkProvider>
      </NetworkProvider>
    </ReadonlyNetworksProvider>
  )
}
