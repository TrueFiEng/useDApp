import React from 'react'
import ReactDOM from 'react-dom'
import {
  Mainnet,
  DAppProvider,
  Ropsten,
  Kovan,
  Config,
  Arbitrum,
  MetamaskConnector,
  InjectedConnector,
  Connector,
  Localhost,
} from '@usedapp/core'
import { WalletConnectConnector } from '@usedapp/wallet-connect-connector'
import { CoinbaseWalletConnector } from '@usedapp/coinbase-connector'
import { PortisConnector } from '@usedapp/portis-connector'
import { App } from './App'
import { getDefaultProvider } from 'ethers'

const PORTIS_DAPP_ID = 'e36dbbe4-d25d-4db2-bfa8-cb80eb87d1f0'

const connectors: Connector[] = [
  new MetamaskConnector(),
  new WalletConnectConnector({ infuraId: 'd8df2cb7844e4a54ab0a782f608749dd' }),
  new CoinbaseWalletConnector('useDapp example', 'd8df2cb7844e4a54ab0a782f608749dd'),
  new PortisConnector(PORTIS_DAPP_ID, 'mainnet', 1),
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
