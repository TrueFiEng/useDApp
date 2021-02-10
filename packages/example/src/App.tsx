import React from 'react'
import { useBlockNumber, useBlockMeta, useEthers } from '@usedapp/core'
import { InjectedConnector } from '@web3-react/injected-connector'

const injected = new InjectedConnector({ supportedChainIds: [1] })

export function App() {
  const blockNumber = useBlockNumber()
  const { chainId, activate } = useEthers()
  const { timestamp, difficulty } = useBlockMeta()

  return (
    <div className="App">
      <p>Chain id: {chainId}</p>
      <p>Current block: {blockNumber}</p>
      {difficulty && <p>Current difficulty: {difficulty.toString()}</p>}
      {timestamp && <p>Current block timestamp: {timestamp.toLocaleString()}</p>}
      <div>
        <button onClick={() => activate(injected)}>Connect</button>
      </div>
    </div>
  )
}
