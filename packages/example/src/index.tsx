import React from 'react'
import ReactDOM from 'react-dom'
import { Mainnet, DAppProvider, Ropsten, Kovan, Config, Arbitrum } from '@usedapp/core'
import { App } from './App'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: 'https://mainnet.infura.io/v3/14a0951f47e646c1b241aa533e150219',
    [Ropsten.chainId]: 'https://ropsten.infura.io/v3/14a0951f47e646c1b241aa533e150219',
    [Kovan.chainId]: 'https://kovan.infura.io/v3/14a0951f47e646c1b241aa533e150219',
    [Arbitrum.chainId]: 'https://arb1.arbitrum.io/rpc',
  },
  networks: [Mainnet, Ropsten, Kovan, Arbitrum],
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
