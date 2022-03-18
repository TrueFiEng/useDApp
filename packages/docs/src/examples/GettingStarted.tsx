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
    [Mainnet.chainId]: 'https://mainnet.infura.io/v3/57fc2c19095745e59ab96a4aa87dada8',
  },
}

ReactDOM.render(
  <DAppProvider config={config}>
    <GettingStarted />
  </DAppProvider>,
  document.getElementById('root')
)

function GettingStarted() {
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