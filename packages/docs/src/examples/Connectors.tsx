import React from 'react'
import ReactDOM from 'react-dom'
import {
  Mainnet,
  DAppProvider,
  Config,
  Arbitrum,
  Goerli,
  MetamaskConnector,
  CoinbaseWalletConnector,
  useEthers,
  useConnector,
} from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import { WalletConnectConnector } from '@usedapp/wallet-connect-connector'
import { PortisConnector } from '@usedapp/portis-connector'

const PORTIS_DAPP_ID = 'e36dbbe4-d25d-4db2-bfa8-cb80eb87d1f0'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
    [Goerli.chainId]: getDefaultProvider('goerli'),
    [Arbitrum.chainId]: 'https://arb1.arbitrum.io/rpc',
  },
  connectors: {
    metamask: new MetamaskConnector(),
    walletConnect: new WalletConnectConnector({ infuraId: 'd8df2cb7844e4a54ab0a782f608749dd' }),
    coinbase: new CoinbaseWalletConnector(),
    portis: new PortisConnector(PORTIS_DAPP_ID, 'mainnet'),
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

export function App() {
  const { connector, isLoading } = useConnector()
  const { activateBrowserWallet, account, chainId, deactivate } = useEthers()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!account) {
    return (
      <div className="button-grid">
        <button onClick={() => activateBrowserWallet({ type: 'metamask' })}> Connect Metamask </button>
        <button onClick={() => activateBrowserWallet({ type: 'coinbase' })}> Connect Coinbase Wallet </button>
        <button onClick={() => activateBrowserWallet({ type: 'walletConnect' })}> Connect Wallet Connect </button>
        <button onClick={() => activateBrowserWallet({ type: 'portis' })}> Connect Portis </button>
      </div>
    )
  }

  return (
    <div>
      <div>Account: {account}</div>
      <div>Chain id: {chainId}</div>
      <div>Connected with: {connector?.connector?.name ?? 'None'}</div>
      <div>
        <button onClick={() => deactivate()}> Disconnect </button>
      </div>
    </div>
  )
}
