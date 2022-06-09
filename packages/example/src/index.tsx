import React from 'react'
import ReactDOM from 'react-dom'
import { Mainnet, DAppProvider, Ropsten, Kovan, Config, Arbitrum, Hardhat } from '@usedapp/core'
import { App } from './App'
import { getDefaultProvider } from 'ethers'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: process.env.MAINNET_URL || getDefaultProvider('mainnet'),
    [Ropsten.chainId]: getDefaultProvider('ropsten'),
    [Kovan.chainId]: getDefaultProvider('kovan'),
    [Arbitrum.chainId]: 'https://arb1.arbitrum.io/rpc',
  },
  multicallVersion: 2 as const,
  fastMulticallEncoding: true,
  noMetamaskDeactivate: true,
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
