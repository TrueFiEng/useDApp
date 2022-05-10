import React from 'react'
import ReactDOM from 'react-dom'
import { formatEther } from '@ethersproject/units'
import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config } from '@usedapp/core'
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

const STAKING_CONTRACT = '0x00000000219ab540356cBB839Cbe05303d7705Fa'

export function App() {
  const { account, activateBrowserWallet, deactivate } = useEthers()
  const userBalance = useEtherBalance(account)
  const stakingBalance = useEtherBalance(STAKING_CONTRACT)

  const ConnectButton = () => (
    <div>
        <button onClick={() => activateBrowserWallet()}>Connect</button>
        <p>Connect to wallet to interact with the example.</p>
    </div>
  )

  const MetamaskConnect = () => (
    <div>
      {account && (
      <div>
          <div className="inline">
              <AccountIcon account={account}/>
              &nbsp;
              <div className="account">{account}</div>
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
      <MetamaskConnect />
      {userBalance && 
        (
          <div className="balance">
            <br/>
            Ether balance: 
            <p className="bold">{formatEther(userBalance)} ETH</p>
          </div>
        )
      }
      {stakingBalance && 
        (
          <div className="balance">
            ETH2 staking balance:
            <p className="bold">{formatEther(stakingBalance)} ETH</p>
          </div>
        )
      }
    </div>
  )
}