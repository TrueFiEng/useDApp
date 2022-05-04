import React from 'react'
import { useEthers } from '@usedapp/core'
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
            <div id="Inline_TYMo">
                <AccountIcon account={account}/>
                {' '}
                <div id="Account_Zr2j">{account}</div>
            </div>
            <br/>
        </div>)}
        {!account && <ConnectButton />}
      </div>
    )
}