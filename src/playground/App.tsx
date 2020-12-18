import { useEffect } from 'react'
import { useEthers } from '../hooks'
import { InjectedConnector } from '@web3-react/injected-connector'
import { SUPPORTED_CHAINS } from '../constants'
import { useBlockNumber } from '../providers'

const injected = new InjectedConnector({ supportedChainIds: SUPPORTED_CHAINS })

export function App() {
  const { library, activate } = useEthers()
  const blockNumber = useBlockNumber()

  useEffect(() => {
    library && library.getBlockNumber().then(console.log)
  })

  return (
    <>
      <div>Hello DApp Framework</div>
      {blockNumber}
      <button onClick={() => activate(injected)}>Connect</button>
    </>
  )
}
