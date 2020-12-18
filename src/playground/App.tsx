import { useEffect } from 'react'
import { useEthers } from '../hooks'
import { InjectedConnector } from '@web3-react/injected-connector'
import { SUPPORTED_CHAINS } from '../constants'

const injected = new InjectedConnector({ supportedChainIds: SUPPORTED_CHAINS })

export function App() {
  const { library, activate } = useEthers()

  useEffect(() => {
    library && library.getBlockNumber().then(console.log)
  })

  return (
    <>
      <div>Hello DApp Framework</div>
      <button onClick={() => activate(injected)}>Connect</button>
    </>
  )
}
