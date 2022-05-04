import React from 'react'
import ReactDOM from 'react-dom'
import { formatEther } from '@ethersproject/units'
import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import { MetamaskConnect } from './components/MetamaskConnect'
import styles from './styles/styles.module.css'

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

export function App() {
  const { account } = useEthers()
  const etherBalance = useEtherBalance(account)

  return (
    <div>
      <MetamaskConnect />
      {etherBalance && 
        (
          <div className={styles.Balance}>
            Ether balance: 
            <p className={styles.Bold}>{formatEther(etherBalance)} ETH</p>
          </div>
        )
      }
    </div>
  )
}