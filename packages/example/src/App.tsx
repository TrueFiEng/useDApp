import React from 'react'
import { useBlockNumber, useEthers } from '@usedapp/core'
import { InjectedConnector } from '@web3-react/injected-connector'

const injected = new InjectedConnector({ supportedChainIds: [1] })

export function App() {
  const blockNumber = useBlockNumber()
  const { chainId, activate } = useEthers()

  return (
    <div className="App">
      <p>Chain id: {chainId}</p>
      <p>Current block: {blockNumber}</p>
      <div>
        <button onClick={() => activate(injected)}>Connect</button>
      </div>
    </div>
  )
}
