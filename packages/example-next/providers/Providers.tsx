import { ReactNode } from 'react'
import { Layout } from './Layout'
import { Arbitrum, Config, DAppProvider, Kovan, Localhost, Mainnet, MetamaskConnector, Ropsten } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import { WalletConnectConnector } from '@usedapp/wallet-connect-connector'
import { CoinbaseWalletConnector } from '@usedapp/coinbase-connector'
import { PortisConnector } from '@usedapp/portis-connector'

const readOnlyUrls: Config['readOnlyUrls'] = {
  [Mainnet.chainId]: process.env.NEXT_PUBLIC_MAINNET_URL || getDefaultProvider('mainnet'),
  [Ropsten.chainId]: process.env.NEXT_PUBLIC_MAINNET_URL
    ? process.env.NEXT_PUBLIC_MAINNET_URL.replace('mainnet', 'ropsten')
    : getDefaultProvider('ropsten'),
  [Kovan.chainId]: process.env.NEXT_PUBLIC_MAINNET_URL
    ? process.env.NEXT_PUBLIC_MAINNET_URL.replace('mainnet', 'kovan')
    : getDefaultProvider('kovan'),
  [Arbitrum.chainId]: 'https://arb1.arbitrum.io/rpc',
}

if (process.env.NEXT_PUBLIC_LOCALHOST_URL) {
  readOnlyUrls[Localhost.chainId] = process.env.NEXT_PUBLIC_LOCALHOST_URL
}

const PORTIS_DAPP_ID = 'e36dbbe4-d25d-4db2-bfa8-cb80eb87d1f0'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls,
  multicallVersion: 2 as const,
  fastMulticallEncoding: true,
  noMetamaskDeactivate: true,
  connectors: {
    metamask: new MetamaskConnector(),
    walletConnect: new WalletConnectConnector({ infuraId: 'd8df2cb7844e4a54ab0a782f608749dd' }),
    coinbase: new CoinbaseWalletConnector('useDapp example', 'd8df2cb7844e4a54ab0a782f608749dd'),
    portis: new PortisConnector(PORTIS_DAPP_ID, 'mainnet', 1),
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
