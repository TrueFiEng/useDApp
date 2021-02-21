import React from 'react'
import ReactDOM from 'react-dom'
import { ChainId, Providers } from '@usedapp/core'
import { App } from './App'

ReactDOM.render(
  <React.StrictMode>
    <Providers readOnlyChain={ChainId.Mainnet}>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
)
