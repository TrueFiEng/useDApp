import React from 'react'
import ReactDOM from 'react-dom'
import { Mainnet, DAppProvider, Ropsten, Kovan, Config, Arbitrum, Localhost, MetamaskConnector } from '@usedapp/core'
import { App } from './App'
import { getDefaultProvider } from 'ethers'
import { WalletConnectConnector } from '@usedapp/wallet-connect-connector'
import { CoinbaseWalletConnector } from '@usedapp/coinbase-connector'
import { PortisConnector } from '@usedapp/portis-connector'

const readOnlyUrls: Config['readOnlyUrls'] = {
  [Mainnet.chainId]: process.env.MAINNET_URL || getDefaultProvider('mainnet'),
  [Ropsten.chainId]: process.env.MAINNET_URL
    ? process.env.MAINNET_URL.replace('mainnet', 'ropsten')
    : getDefaultProvider('ropsten'),
  [Kovan.chainId]: process.env.MAINNET_URL
    ? process.env.MAINNET_URL.replace('mainnet', 'kovan')
    : getDefaultProvider('kovan'),
  [Arbitrum.chainId]: 'https://arb1.arbitrum.io/rpc',
}

if (process.env.LOCALHOST_URL) {
  readOnlyUrls[Localhost.chainId] = process.env.LOCALHOST_URL
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
    coinbase: new CoinbaseWalletConnector(
      'useDapp example',
      'https://mainnet.infura.io/v3/d8df2cb7844e4a54ab0a782f608749dd'
    ),
    portis: new PortisConnector(PORTIS_DAPP_ID, 'mainnet', 1),
  },
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
