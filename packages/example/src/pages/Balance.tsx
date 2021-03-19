import { formatEther } from '@ethersproject/units'
import React from 'react'
import { useEthers, useEtherBalance } from '@usedapp/core'

const STAKING_CONTRACT = '0x00000000219ab540356cBB839Cbe05303d7705Fa'

export function Balance() {
  const { activateBrowserWallet, deactivate, account } = useEthers()
  const userBalance = useEtherBalance(account)
  const stakingBalance = useEtherBalance(STAKING_CONTRACT)

  return (
    <div>
      {!account && <button onClick={() => activateBrowserWallet()}>Connect</button>}
      {account && <button onClick={() => deactivate()}>Disconnect</button>}
      {stakingBalance && <p>ETH2 staking contract holds: {formatEther(stakingBalance)} ETH </p>}
      {account && <p>Account: {account}</p>}
      {userBalance && <p>Ether balance: {formatEther(userBalance)} ETH </p>}
    </div>
  )
}
