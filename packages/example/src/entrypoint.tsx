import React from 'react'
import ReactDOM from 'react-dom'
import {
  Mainnet,
  DAppProvider,
  Ropsten,
  Kovan,
  Config,
  Arbitrum,
  WalletConnectConnector,
  MetamaskConnector,
  CoinbaseWalletConnector,
  InjectedConnector,
  Connector,
  Localhost,
} from '@usedapp/core'
import { App } from './App'
import { getDefaultProvider } from 'ethers'

const connectors: Connector[] = [
  new MetamaskConnector(),
  new WalletConnectConnector({ infuraId: 'd8df2cb7844e4a54ab0a782f608749dd' }),
  new CoinbaseWalletConnector('useDapp example', 'd8df2cb7844e4a54ab0a782f608749dd'),
]

if (window.ethereum) {
  connectors.push(new InjectedConnector(window.ethereum))
}

const readOnlyUrls: Config['readOnlyUrls'] = {
  [Mainnet.chainId]: process.env.MAINNET_URL || getDefaultProvider('mainnet'),
  [Ropsten.chainId]: getDefaultProvider('ropsten'),
  [Kovan.chainId]: getDefaultProvider('kovan'),
  [Arbitrum.chainId]: 'https://arb1.arbitrum.io/rpc',
}

if (process.env.LOCALHOST_URL) {
  readOnlyUrls[Localhost.chainId] = process.env.LOCALHOST_URL
}

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls,
  multicallVersion: 2 as const,
  fastMulticallEncoding: true,
  noMetamaskDeactivate: true,
  connectors,
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
