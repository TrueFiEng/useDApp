import React from 'react'
import ReactDOM from 'react-dom'

import {
  Mainnet,
  DAppProvider,
  useEtherBalance,
  useEthers,
  Config,
} from '@usedapp/core'
import { formatEther } from '@ethersproject/units'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: 'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
  },
}

console.log('THIS RUNS')



const intervalId = setInterval(() => {
  if(document.getElementById('root123')) {
    clearInterval(intervalId)

    ReactDOM.render(
      <React.StrictMode>
        <DAppProvider config={config}>
          <App />
        </DAppProvider>
      </React.StrictMode>,
      document.getElementById('root123')
    )

  }
}, 100)

// document.onload = () => {
//   console.log(document.getElementById('root123'))
// }

export function App() {
  const { activateBrowserWallet, account } = useEthers()
  const etherBalance = useEtherBalance(account)
  return (
    <div>
      <div>
        <button onClick={() => activateBrowserWallet()}>Connect</button>
      </div>
      {account && <p>Account: {account}</p>}
      {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
    </div>
  )
}