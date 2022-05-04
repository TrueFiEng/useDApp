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
import { getDefaultProvider } from 'ethers'
import { MetamaskConnect } from './components/MetamaskConnect'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
  },
}

ReactDOM.render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>,
  document.getElementById('root')
)

function App() {
  const { account, deactivate } = useEthers()
  const etherBalance = useEtherBalance(account)

  return (
      <div>
      <MetamaskConnect />
      {account && <button onClick={() => deactivate()}>Disconnect</button>}
      {etherBalance && 
        (
          <div id="Balance_DvYH">
            <br/>
            Balance: 
            <p id="Bold_yXij">{formatEther(etherBalance)}</p>
          </div>
        )
      }
    </div>
  )
}