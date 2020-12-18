import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { GlobalStyles } from './GlobalStyles'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'


ReactDOM.render(
  <>
    <Web3ReactProvider getLibrary={getLibrary}>
      <GlobalStyles />
      <App />
    </Web3ReactProvider>
  </>,
  document.getElementById('app')
)

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider, 'any')
  library.pollingInterval = 15000
  return library
}