import { useBlockMeta, useBlockNumber, useEthers } from '@usedapp/core'
import React from 'react'

export function App() {
  const blockNumber = useBlockNumber()
  const { chainId, activateBrowserWallet, deactivate, account } = useEthers()
  const { timestamp, difficulty } = useBlockMeta()

  return (
    <div className="App">
      <p>Chain id: {chainId}</p>
      <p>Current block: {blockNumber}</p>
      {difficulty && <p>Current difficulty: {difficulty.toString()}</p>}
      {timestamp && <p>Current block timestamp: {timestamp.toLocaleString()}</p>}
      <div>
        <button onClick={() => activateBrowserWallet()}>Connect</button>
        <button onClick={() => deactivate()}>Disconnect</button>
      </div>
      {account && <p>Account: {account}</p>}
    </div>
  )
}
