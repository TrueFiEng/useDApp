import React from 'react'
import ReactDOM from 'react-dom'
import { ChainId, Config, DAppProvider, DEFAULT_SUPPORTED_CHAINS } from '@usedapp/core'
import { App } from './App'

const MULTICALL_ADDRESSES: { [index: number]: string } = {}
DEFAULT_SUPPORTED_CHAINS.filter((network) => network.multicallAddress).map(
  (network) => (MULTICALL_ADDRESSES[network.chainId] = network.multicallAddress)
)

const config: Config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/3165a249c65f4198bf57200109b8fadf',
  },
  multicallAddresses: MULTICALL_ADDRESSES,
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
