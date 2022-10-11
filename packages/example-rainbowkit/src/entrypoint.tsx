import React from 'react'
import ReactDOM from 'react-dom'
import {
  Mainnet,
  DAppProvider,
  Config,
  Localhost,
  MetamaskConnector,
  CoinbaseWalletConnector,
  Goerli,
  OptimismGoerli,
  Optimism,
  Polygon,
  Arbitrum,
} from '@usedapp/core'
import { App } from './App'
import { getDefaultProvider } from 'ethers'
import { WalletConnectConnector } from '@usedapp/wallet-connect-connector'
import { PortisConnector } from '@usedapp/portis-connector'

import '@usedapp/rainbowkit/dist/index.css'

import { getDefaultWallets, RainbowKitProvider } from '@usedapp/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const readOnlyUrls: Config['readOnlyUrls'] = {
  [Mainnet.chainId]: process.env.MAINNET_URL || getDefaultProvider('mainnet'),
  [Goerli.chainId]: process.env.MAINNET_URL
    ? process.env.MAINNET_URL.replace('mainnet', 'goerli')
    : getDefaultProvider('goerli'),
  [Optimism.chainId]: 'https://mainnet.optimism.io',
  [OptimismGoerli.chainId]: 'https://goerli.optimism.io',
  [Polygon.chainId]: 'https://polygon-rpc.com',
  [Arbitrum.chainId]: 'https://arb1.arbitrum.io/rpc'
}

if (process.env.LOCALHOST_URL) {
  readOnlyUrls[Localhost.chainId] = process.env.LOCALHOST_URL
}

if (process.env.LOCALHOST_URL) {
  readOnlyUrls[Localhost.chainId] = process.env.LOCALHOST_URL
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

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.goerli],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
