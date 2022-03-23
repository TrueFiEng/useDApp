import React from 'react'
import ReactDOM from 'react-dom'

import {
  Mainnet,
  DAppProvider,
  useEthers,
  Config,
  useEtherBalance
} from '@usedapp/core'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { formatEther } from '@ethersproject/units'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: 'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
  },
}

ReactDOM.render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>,
  document.getElementById('root')
)

function App() {
    const { account, activate, deactivate } = useEthers()
    const etherBalance = useEtherBalance(account)
  
    async function onConnect() {
      try {
        const provider = new WalletConnectProvider({
          infuraId: '62687d1a985d4508b2b7a24827551934',
        })
        await provider.enable()
        activate(provider)
      } catch (error) {
        console.error(error)
      }
    }
    
  return (
    <div>
      {!account && <button onClick={() => onConnect()}>Connect</button>}
      {account && <button onClick={deactivate}>Disconnect</button>}
      {account && <p>Account: {account}</p>}
      {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
    </div>
  )
}
