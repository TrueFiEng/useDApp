import { ethers } from 'ethers'
import { ReactNode, useState } from 'react'
import { ChainId, MULTICALL_ADDRESSES } from '../constants'
import { Config } from '../model/config/Config'
import { ConfigProvider } from '../providers/config/provider'
import { BlockNumberProvider } from './blockNumber/provider'
import { ChainStateProvider } from './chainState'
import { useConfig } from './config/context'
import { EthersProvider } from './EthersProvider'
import { NotificationsProvider } from './notifications/provider'
import { ReadOnlyProviderActivator } from './ReadOnlyProviderActivator'
import { TransactionProvider } from './transactions/provider'
import multicallABI from '../constants/abi/MultiCall.json'

interface DAppProviderProps {
  children: ReactNode
  config: Config
}

interface ContractDeployment {
  contractAddress: string
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

async function setupLocalMulticall(url: string): Promise<ContractDeployment> {
  const deployContract = async (provider: ethers.providers.JsonRpcProvider, account: string) => {
    const txData = [{
      "from": account,
      "gas": "0x64b94",
      "data": `0x${multicallABI.bytecode}`
    }]

    console.log(`Deploying Multicall contract to ${url} using account ${account}`)

    const transactionHash = await provider.send('eth_sendTransaction', txData)
    const txResult = await provider.send('eth_getTransactionReceipt', [transactionHash])
    console.log(txResult)
    console.log(`Add the following to the configs: ${txResult.contractAddress}`)
    return txResult
  }

  const provider = new ethers.providers.JsonRpcProvider(url)
  const accounts = await provider.listAccounts()
  console.log("ACCOUNTS", accounts)
  return deployContract(provider, accounts[0])
}

function DAppProviderWithConfig({ children }: WithConfigProps) {
  const [localMulticallAddresses, setLocalMulticallAddresses] = useState({})
  const { multicallAddresses, readOnlyChainId, readOnlyUrls } = useConfig()
  const multicallAddressesMerged = { ...MULTICALL_ADDRESSES, ...multicallAddresses, ...localMulticallAddresses }

  const setupMulticall = (chainId: ChainId) => {
    if (readOnlyUrls !== undefined && readOnlyUrls[chainId]) {
      setupLocalMulticall(readOnlyUrls[chainId])
        .then(txContractDeploy => {
          setLocalMulticallAddresses({
            [chainId]: txContractDeploy.contractAddress
          })
        }).catch(_ => {
          console.error(`Could not deploy multicall contract to ${readOnlyUrls[chainId]}`);
        })
    }
  }

  return (
    <EthersProvider>
      <BlockNumberProvider>
        {readOnlyChainId && readOnlyUrls && (
          <ReadOnlyProviderActivator readOnlyChainId={readOnlyChainId} readOnlyUrls={readOnlyUrls} />
        )}
        <ChainStateProvider multicallAddresses={multicallAddressesMerged} setupMulticall={setupMulticall}>
          <NotificationsProvider>
            <TransactionProvider>{children}</TransactionProvider>
          </NotificationsProvider>
        </ChainStateProvider>
      </BlockNumberProvider>
    </EthersProvider>
  )
}
