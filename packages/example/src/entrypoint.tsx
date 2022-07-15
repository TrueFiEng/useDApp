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
} from '@usedapp/core'
import { App } from './App'
import { getDefaultProvider } from 'ethers'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: process.env.MAINNET_URL || getDefaultProvider('mainnet'),
    [Ropsten.chainId]: getDefaultProvider('ropsten'),
    [Kovan.chainId]: getDefaultProvider('kovan'),
    [Arbitrum.chainId]: 'https://arb1.arbitrum.io/rpc',
  },
  connectors: [
    new MetamaskConnector(),
    new WalletConnectConnector({ infuraId: 'd8df2cb7844e4a54ab0a782f608749dd' }),
    new CoinbaseWalletConnector('useDapp example', 'd8df2cb7844e4a54ab0a782f608749dd'),
    new InjectedConnector(window.ethereum),
  ],
  multicallVersion: 2 as const,
  fastMulticallEncoding: true,
  noMetamaskDeactivate: true,
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
