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
} from '@usedapp/core'
import { App } from './App'
import { WalletConnectConnector } from '@usedapp/wallet-connect-connector'
import { PortisConnector } from '@usedapp/portis-connector'
import { WalletConnectV2Connector } from '@usedapp/wallet-connect-v2-connector'
import { getDefaultProvider } from '@ethersproject/providers'

const readOnlyUrls: Config['readOnlyUrls'] = {
  [Mainnet.chainId]: process.env.MAINNET_URL || getDefaultProvider('mainnet'),
  [Goerli.chainId]: process.env.MAINNET_URL
    ? process.env.MAINNET_URL.replace('mainnet', 'goerli')
    : getDefaultProvider('goerli'),
  [Optimism.chainId]: 'https://mainnet.optimism.io',
  [OptimismGoerli.chainId]: 'https://goerli.optimism.io',
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
    walletConnectV2: new WalletConnectV2Connector({
      projectId: 'bffbe493c0928ee125dc8f23e20167b7',
      chains: [Mainnet, Goerli],
      checkGnosisSafe: true,
      rpcMap: {
        1: 'https://mainnet.infura.io/v3/d8df2cb7844e4a54ab0a782f608749dd',
        5: 'https://goerli.infura.io/v3/d8df2cb7844e4a54ab0a782f608749dd',
      }
    })
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
