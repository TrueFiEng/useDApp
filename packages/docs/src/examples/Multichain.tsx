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
      <div id="Balance_src-examples-styles-styles-module"> Account:</div>
      <div id="Inline_src-examples-styles-styles-module">
        <AccountIcon account={address}/>
          &nbsp;
        <div id="Account_src-examples-styles-styles-module">{address}</div>
      </div>
      <br/>
      <div id="Balance_src-examples-styles-styles-module"> 
        Balance on Mainnet: 
        <p id="Bold_src-examples-styles-styles-module">{mainnetBalance && formatEther(mainnetBalance)} Eth </p>
      </div>
      <div id="Balance_src-examples-styles-styles-module"> 
        Balance on Arbitrum: 
        <p id="Bold_src-examples-styles-styles-module">{arbitrumBalance && formatEther(arbitrumBalance)} AEth 
      </p></div>
      <div id="Balance_src-examples-styles-styles-module"> 
        Balance on ZkSync Testnet: 
        <p id="Bold_src-examples-styles-styles-module">{zkSyncBalance && formatEther(zkSyncBalance)} ZKEth 
      </p></div>
    </>
  )
}
