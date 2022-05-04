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
import { getDefaultProvider } from 'ethers'
import { AccountIcon } from './components/AccountIcon'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
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
        await activate(provider)
      } catch (error) {
        console.error(error)
      }
    }

    const ConnectButton = () => (
      <div>
          <button onClick={onConnect}>Connect</button>
      </div>
    )
  
    const WalletConnectConnect = () => (
      <div>
        {account && (
        <div>
            <div id="Inline_src-examples-styles-styles-module">
                <AccountIcon account={account}/>
                {' '}
                <div id="Account_src-examples-styles-styles-module">{account}</div>
            </div>
            <br/>
        </div>)}
        {!account && <ConnectButton />}
        {account && <button onClick={deactivate}>Disconnect</button>}
        <br/>
      </div>
    )
    
  return (
    <div>
      <WalletConnectConnect />
        {etherBalance && 
        (
          <div id="Balance_src-examples-styles-styles-module">
            <br/>
            Balance: 
            <p id="Bold_src-examples-styles-styles-module">{formatEther(etherBalance)} ETH</p>
          </div>
        )
        }
    </div>
  )
}
