import React from 'react'
import ReactDOM from 'react-dom'
import { Mainnet, DAppProvider, Ropsten, Kovan, Config, Arbitrum, DEFAULT_SUPPORTED_CHAINS, Chain } from '@usedapp/core'
import { App } from './App'

export const TutorialChain: Chain = {
  chainId: 99999,
  chainName: 'TutorialChain',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x0000000000000000000000000000000000000000',
  getExplorerAddressLink: (address: string) => `https://tutorialchain.etherscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://tutorialchain.etherscan.io/tx/${transactionHash}`,
}

const config: Config = {
  readOnlyChainId: TutorialChain.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: 'https://mainnet.infura.io/v3/57fc2c19095745e59ab96a4aa87dada8',
    [Ropsten.chainId]: 'https://ropsten.infura.io/v3/57fc2c19095745e59ab96a4aa87dada8',
    [Kovan.chainId]: 'https://kovan.infura.io/v3/57fc2c19095745e59ab96a4aa87dada8',
    [Arbitrum.chainId]: 'https://arb1.arbitrum.io/rpc',
  },
  networks: [...DEFAULT_SUPPORTED_CHAINS, TutorialChain],
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
