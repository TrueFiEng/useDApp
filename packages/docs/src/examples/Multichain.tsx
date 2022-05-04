import React from 'react'
import { Config, DAppProvider, ZkSyncTestnet, Arbitrum, useEtherBalance, Mainnet } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import ReactDOM from 'react-dom'
import { getDefaultProvider } from 'ethers'
import { AccountIcon } from './components/AccountIcon'
import styles from './styles/styles.module.css'

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
      <div className={styles.Balance}> Account:</div>
      <div className={styles.Inline}>
        <AccountIcon account={address}/>
        {' '}
        <div className={styles.Account}>{address}</div>
      </div>
      <br/>
      <div className={styles.Balance}> Balance on Mainnet: <p className={styles.Bold}>{mainnetBalance && formatEther(mainnetBalance)} Eth </p></div>
      <div className={styles.Balance}> Balance on Arbitrum: <p className={styles.Bold}>{arbitrumBalance && formatEther(arbitrumBalance)} AEth </p></div>
      <div className={styles.Balance}> Balance on ZkSync Testnet: <p className={styles.Bold}>{zkSyncBalance && formatEther(zkSyncBalance)} ZKEth </p></div>
    </>
  )
}
