import React from 'react'
import ReactDOM from 'react-dom'
import { Mainnet, DAppProvider, Ropsten, Kovan, Config, Arbitrum } from '@usedapp/core'
import { App } from './App'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: 'https://mainnet.infura.io/v3/d8df2cb7844e4a54ab0a782f608749dd',
    [Ropsten.chainId]: 'https://ropsten.infura.io/v3/d8df2cb7844e4a54ab0a782f608749dd',
    [Kovan.chainId]: 'https://kovan.infura.io/v3/d8df2cb7844e4a54ab0a782f608749dd',
    [Arbitrum.chainId]: 'https://arb1.arbitrum.io/rpc',
  },
  multicallVersion: 2 as const,
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
