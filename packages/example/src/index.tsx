import React from 'react'
import ReactDOM from 'react-dom'
import { Mainnet, DAppProvider } from '@usedapp/core'
import { App } from './App'

const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: 'https://mainnet.infura.io/v3/14a0951f47e646c1b241aa533e150219',
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
