import React from 'react'
import { useEthers } from '@usedapp/core'
import styles from '../styles/styles.module.css'
import { AccountIcon } from './AccountIcon'

export const MetamaskConnect = () => {
    const { account, activateBrowserWallet } = useEthers()

    const ConnectButton = () => (
    <div>
        <button onClick={() => activateBrowserWallet()}>Connect</button>
        <p>Connect to wallet to interact with the example.</p>
    </div>)

    return (
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
      </div>
    )
}