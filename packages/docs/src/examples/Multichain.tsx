import React from 'react'
import { Config, DAppProvider, ZkSyncTestnet, Arbitrum, useEtherBalance } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import ReactDOM from 'react-dom'

const address = '0xe13610d0a3e4303c70791773C5DF8Bb16de185d1'

const config: Config = {
    readOnlyUrls: {
      [ZkSyncTestnet.chainId]: 'https://zksync2-testnet.zksync.dev',
      [Arbitrum.chainId]: 'https://arb1.arbitrum.io/rpc',
    },
}
  
ReactDOM.render(
    <DAppProvider config={config}>
      <App />
    </DAppProvider>,
    document.getElementById('root')
)

export function App() {
  const arbitrumBalance = useEtherBalance(address, { chainId: Arbitrum.chainId })
  const zkSyncBalance = useEtherBalance(address, { chainId: ZkSyncTestnet.chainId })

  return (
    <>
      <div> Account address: {address}</div>
      <div> Balance on Arbitrum: {arbitrumBalance && formatEther(arbitrumBalance)} AEth </div>
      <div> Balance on ZkSync Testnet: {zkSyncBalance && formatEther(zkSyncBalance)} ZKEth </div>
    </>
  )
}
