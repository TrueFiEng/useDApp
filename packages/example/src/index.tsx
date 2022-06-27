import React from 'react'
import ReactDOM from 'react-dom'
import { Mainnet, DAppProvider, Ropsten, Kovan, Config, Arbitrum, PortisConnector } from '@usedapp/core'
import { App } from './App'
import { getDefaultProvider } from 'ethers'
import { MetamaskConnector, WalletConnectConnector } from '@usedapp/core'

const PORTIS_DAPP_ID = 'e36dbbe4-d25d-4db2-bfa8-cb80eb87d1f0'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: process.env.MAINNET_URL || getDefaultProvider('mainnet'),
    [Ropsten.chainId]: getDefaultProvider('ropsten'),
    [Kovan.chainId]: getDefaultProvider('kovan'),
    [Arbitrum.chainId]: 'https://arb1.arbitrum.io/rpc',
  },
  multicallVersion: 2 as const,
  connectors: [
    new MetamaskConnector(),
    new PortisConnector(PORTIS_DAPP_ID, 'mainnet'),
    new WalletConnectConnector({infuraId: 'd8df2cb7844e4a54ab0a782f608749dd'}),
  ],
  autoConnect: true,
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
