import { useEffect } from 'react'
import { useBlockMeta, useEthers } from '../hooks'
import { InjectedConnector } from '@web3-react/injected-connector'
import { SUPPORTED_CHAINS } from '../constants'
import { useBlockNumber } from '../providers'

const injected = new InjectedConnector({ supportedChainIds: SUPPORTED_CHAINS })

export function App() {
  const { library, activate } = useEthers()
  const blockNumber = useBlockNumber()
  const { timestamp, difficulty } = useBlockMeta()

  useEffect(() => {
    library && library.getBlockNumber().then(console.log)
  })

  return (
    <>
      <div>Hello DApp Framework</div>
      {blockNumber}
      {difficulty && <p>Current difficulty: {difficulty.toString()}</p>}
      {timestamp && <p>Current block timestamp: {timestamp.toLocaleString()}</p>}
      <button onClick={() => activate(injected)}>Connect</button>
    </>
  )
}
