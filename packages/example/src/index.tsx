import React from 'react'
import ReactDOM from 'react-dom'
import { Mainnet, DAppProvider } from '@usedapp/core'
import { App } from './App'

const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: 'https://mainnet.infura.io/v3/3165a249c65f4198bf57200109b8fadf',
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
