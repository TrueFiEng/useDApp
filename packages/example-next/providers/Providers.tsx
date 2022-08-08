import { ReactNode } from 'react'
import { Layout } from './Layout'
import { Arbitrum, CoinbaseWalletConnector, Config, Connector, DAppProvider, InjectedConnector, Kovan, Localhost, Mainnet, MetamaskConnector, Ropsten, WalletConnectConnector } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

declare global {
  interface Window {
    ethereum: any
  }
}

const connectors: Connector[] = [
  new MetamaskConnector(),
  new WalletConnectConnector({ infuraId: 'd8df2cb7844e4a54ab0a782f608749dd' }),
  new CoinbaseWalletConnector('useDapp example', 'd8df2cb7844e4a54ab0a782f608749dd'),
]

if (typeof window !== "undefined") {
  if (window.ethereum) {
    connectors.push(new InjectedConnector(window.ethereum))
  }
}

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: process.env.MAINNET_URL || getDefaultProvider('mainnet'),
    [Ropsten.chainId]: getDefaultProvider('ropsten'),
    [Kovan.chainId]: getDefaultProvider('kovan'),
    [Arbitrum.chainId]: 'https://arb1.arbitrum.io/rpc',
    [Localhost.chainId]: 'http://localhost:8545',
  },
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
