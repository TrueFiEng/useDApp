import React from 'react'
import { Config, DAppProvider, ZkSyncTestnet, Arbitrum, useEtherBalance, Mainnet } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import ReactDOM from 'react-dom'
import { getDefaultProvider } from 'ethers'
import { AccountIcon } from './components/AccountIcon'

const address = '0xe13610d0a3e4303c70791773C5DF8Bb16de185d1'

const config: Config = {
    readOnlyUrls: {
      [Mainnet.chainId]: getDefaultProvider('mainnet'),
      [Arbitrum.chainId]: 'https://arb1.arbitrum.io/rpc',
      [ZkSyncTestnet.chainId]: 'https://zksync2-testnet.zksync.dev',
    },
}
  
ReactDOM.render(
    <DAppProvider config={config}>
      <App />
    </DAppProvider>,
    document.getElementById('root')
)

export function App() {
  const mainnetBalance = useEtherBalance(address, { chainId: Mainnet.chainId })
  const arbitrumBalance = useEtherBalance(address, { chainId: Arbitrum.chainId })
  const zkSyncBalance = useEtherBalance(address, { chainId: ZkSyncTestnet.chainId })

  return (
    <>
      <div className="balance"> Account:</div>
      <div className="inline">
        <AccountIcon account={address}/>
          &nbsp;
        <div className="account">{address}</div>
      </div>
      <br/>
      <div className="balance"> 
        Balance on Mainnet: 
        <p className="bold">{mainnetBalance && formatEther(mainnetBalance)} Eth </p>
      </div>
      <div className="balance"> 
        Balance on Arbitrum: 
        <p className="bold">{arbitrumBalance && formatEther(arbitrumBalance)} AEth 
      </p></div>
      <div className="balance"> 
        Balance on ZkSync Testnet: 
        <p className="bold">{zkSyncBalance && formatEther(zkSyncBalance)} ZKEth 
      </p></div>
    </>
  )
}
