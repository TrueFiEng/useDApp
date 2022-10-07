import { ReactNode } from 'react'
import { Layout } from './Layout'
import {
  Config,
  DAppProvider,
  Localhost,
  Mainnet,
  MetamaskConnector,
  CoinbaseWalletConnector,
  Goerli,
  Optimism,
  OptimismGoerli,
} from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import { WalletConnectConnector } from '@usedapp/wallet-connect-connector'
import { PortisConnector } from '@usedapp/portis-connector'

const readOnlyUrls: Config['readOnlyUrls'] = {
  [Mainnet.chainId]: process.env.MAINNET_URL || getDefaultProvider('mainnet'),
  [Goerli.chainId]: process.env.MAINNET_URL
    ? process.env.MAINNET_URL.replace('mainnet', 'goerli')
    : getDefaultProvider('goerli'),
  [Optimism.chainId]: process.env.MAINNET_URL
    ? process.env.MAINNET_URL.replace('mainnet', 'optimism')
    : 'https://mainnet.optimism.io',
  [OptimismGoerli.chainId]: process.env.MAINNET_URL
    ? process.env.MAINNET_URL.replace('mainnet', 'optimism-goerli')
    : 'https://goerli.optimism.io',
}

if (process.env.NEXT_PUBLIC_LOCALHOST_URL) {
  readOnlyUrls[Localhost.chainId] = process.env.NEXT_PUBLIC_LOCALHOST_URL
}

const PORTIS_DAPP_ID = 'e36dbbe4-d25d-4db2-bfa8-cb80eb87d1f0'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls,
  multicallVersion: 1 as const,
  fastMulticallEncoding: true,
  noMetamaskDeactivate: true,
  connectors: {
    metamask: new MetamaskConnector(),
    walletConnect: new WalletConnectConnector({ infuraId: 'd8df2cb7844e4a54ab0a782f608749dd' }),
    coinbase: new CoinbaseWalletConnector(),
    portis: new PortisConnector(PORTIS_DAPP_ID, 'mainnet'),
  },
}

interface Props {
  children: ReactNode
}

export function Providers(props: Props) {
  return (
    <DAppProvider config={config}>
      <Layout>{props.children}</Layout>
    </DAppProvider>
  )
}
