import React from 'react'
import { useEthers } from '@usedapp/core'
import { AccountIcon } from './AccountIcon'

export const MetamaskConnect = () => {
  const { account, activateBrowserWallet } = useEthers()

  const ConnectButton = () => (
    <div>
      <button onClick={() => activateBrowserWallet()}>Connect</button>
      <p>Connect to wallet to interact with the example.</p>
    </div>
  )

  return (
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
    </div>
  )
}
