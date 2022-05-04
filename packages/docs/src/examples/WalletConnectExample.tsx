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
import styles from './styles/styles.module.css'
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
            <div className={styles.Inline}>
                <AccountIcon account={account}/>
                {' '}
                <div className={styles.Account}>{account}</div>
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
      {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
    </div>
  )
}
