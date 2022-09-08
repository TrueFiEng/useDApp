import { ReactNode, useMemo } from 'react'
import { Config, Chain } from '../constants'
import { ConfigProvider } from './config'
import { MultiChainStateProvider } from './chainState'
import { useConfig } from '../hooks'
import { NotificationsProvider } from './notifications/provider'
import { TransactionProvider } from './transactions/provider'
import { LocalMulticallProvider } from './LocalMulticallProvider'
import { ReadonlyNetworksProvider } from './network'
import { BlockNumbersProvider } from './blockNumber/blockNumbers'
import { WindowProvider } from './window'
import { ConnectorContextProvider } from './network/connectors/context'

export interface DAppProviderProps {
  children?: ReactNode
  /**
   * Configuration of the DApp. See {@link Config} for more details.
   */
  config: Config
}

/**
 * Provides basic services for a DApp.
 * @public
 */
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
  const multicallAddressesMerged = useMemo(() => ({ ...defaultAddresses, ...multicallAddresses }), [
    defaultAddresses,
    multicallAddresses,
  ])

  return (
    <ConnectorContextProvider>
      <WindowProvider>
        <ReadonlyNetworksProvider>
          <BlockNumbersProvider>
            <LocalMulticallProvider>
              <MultiChainStateProvider multicallAddresses={multicallAddressesMerged}>
                <NotificationsProvider>
                  <TransactionProvider>{children}</TransactionProvider>
                </NotificationsProvider>
              </MultiChainStateProvider>
            </LocalMulticallProvider>
          </BlockNumbersProvider>
        </ReadonlyNetworksProvider>
      </WindowProvider>
    </ConnectorContextProvider>
  )
}
