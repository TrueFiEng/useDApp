import { ReactNode, useState } from 'react'
import { ChainId, MULTICALL_ADDRESSES } from '../constants'
import { Config } from '../model/config/Config'
import { ConfigProvider } from '../providers/config/provider'
import { BlockNumberProvider } from './blockNumber/provider'
import { ChainStateProvider } from './chainState'
import { useConfig } from './config/context'
import { EthersProvider } from './EthersProvider'
import { NotificationsProvider } from './notifications/provider'
import { NetworkActivator } from './NetworkActivator'
import { TransactionProvider } from './transactions/provider'
import { deployLocalMulticall } from '../helpers/contract'

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

function DAppProviderWithConfig({ children }: WithConfigProps) {
  const [localMulticallAddresses, setLocalMulticallAddresses] = useState({})
  const { multicallAddresses, readOnlyUrls } = useConfig()
  const multicallAddressesMerged = { ...MULTICALL_ADDRESSES, ...multicallAddresses, ...localMulticallAddresses }

  const setupMulticall = (chainId: ChainId) => {
    console.log(`Deploying Multicall contract on the local node`)

    deployLocalMulticall(chainId, readOnlyUrls)
      .then(txContractDeploy => {
        if (txContractDeploy === undefined) throw TypeError('Failed to deploy Multicall')
        console.log(`Add the Multicall Address to the configs:
{
  multicallAddresses: {
    [ChainId.Localhost]: "${txContractDeploy.contractAddress}"
  },
}`
        )
        setLocalMulticallAddresses({
          [chainId]: txContractDeploy.contractAddress
        })
      }).catch(_ => {
        console.error(`Could not deploy multicall contract to ${(readOnlyUrls || {})[chainId]}`);
      })
  }

  return (
    <EthersProvider>
      <BlockNumberProvider>
        <NetworkActivator />
        <ChainStateProvider multicallAddresses={multicallAddressesMerged} onMulticallNotFound={setupMulticall}>
          <NotificationsProvider>
            <TransactionProvider>{children}</TransactionProvider>
          </NotificationsProvider>
        </ChainStateProvider>
      </BlockNumberProvider>
    </EthersProvider>
  )
}
