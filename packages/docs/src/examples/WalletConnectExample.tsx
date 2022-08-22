import React from 'react'
import ReactDOM from 'react-dom'

import { Mainnet, DAppProvider, useEthers, Config, useEtherBalance, Rinkeby } from '@usedapp/core'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { formatEther } from '@ethersproject/units'
import { getDefaultProvider } from 'ethers'
import { AccountIcon } from './components/AccountIcon'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
    [Rinkeby.chainId]: getDefaultProvider('rinkeby'),
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
        infuraId: 'fb8e136826194e17957732a5167af494',
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
          <div className="inline">
            <AccountIcon account={account} />
            &nbsp;
            <div className="account">{account}</div>
          </div>
          <br />
        </div>
      )}
      {!account && <ConnectButton />}
      {account && <button onClick={deactivate}>Disconnect</button>}
      <br />
    </div>
  )

  return (
    <div>
      <WalletConnectConnect />
      {etherBalance && (
        <div className="balance">
          <br />
          Balance:
          <p className="bold">{formatEther(etherBalance)} ETH</p>
        </div>
      )}
    </div>
  )
}
