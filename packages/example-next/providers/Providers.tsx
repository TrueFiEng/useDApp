import { ReactNode } from 'react'
import { Layout } from './Layout'
import { Arbitrum, CoinbaseWalletConnector, Config, Connector, DAppProvider, InjectedConnector, Kovan, Localhost, Mainnet, MetamaskConnector, PortisConnector, Ropsten, WalletConnectConnector } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

declare global {
  interface Window {
    ethereum: any
  }
}

const PORTIS_DAPP_ID = 'e36dbbe4-d25d-4db2-bfa8-cb80eb87d1f0'

const connectors: Connector[] = [
  new MetamaskConnector(),
  new WalletConnectConnector({ infuraId: 'd8df2cb7844e4a54ab0a782f608749dd' }),
  new CoinbaseWalletConnector('useDapp example', 'd8df2cb7844e4a54ab0a782f608749dd'),
  new PortisConnector(PORTIS_DAPP_ID, 'mainnet', 1)
]

if (typeof window !== "undefined") {
  if (window.ethereum) {
    connectors.push(new InjectedConnector(window.ethereum))
  }
}

const readOnlyUrls: Config['readOnlyUrls'] = {
  [Mainnet.chainId]: process.env.NEXT_PUBLIC_MAINNET_URL || getDefaultProvider('mainnet'),
  [Ropsten.chainId]: getDefaultProvider('ropsten'),
  [Kovan.chainId]: getDefaultProvider('kovan'),
  [Arbitrum.chainId]: 'https://arb1.arbitrum.io/rpc',
}

if (process.env.NEXT_PUBLIC_LOCALHOST_URL) {
  readOnlyUrls[Localhost.chainId] = process.env.NEXT_PUBLIC_LOCALHOST_URL
}

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls,
  multicallVersion: 2 as const,
  fastMulticallEncoding: true,
  noMetamaskDeactivate: true,
  connectors,
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
