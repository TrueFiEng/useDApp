import React from 'react'
import ReactDOM from 'react-dom'

import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config, Goerli } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import { getDefaultProvider } from 'ethers'
import { MetamaskConnect } from './components/MetamaskConnect'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
    [Goerli.chainId]: getDefaultProvider('goerli'),
  },
}

ReactDOM.render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>,
  document.getElementById('root')
)

function App() {
  const { account, deactivate, chainId } = useEthers()
  const etherBalance = useEtherBalance(account)
  if (!config.readOnlyUrls[chainId]) {
    return <p>Please use either Mainnet or Goerli testnet.</p>
  }

  return (
    <div>
      <MetamaskConnect />
      {account && <button onClick={() => deactivate()}>Disconnect</button>}
      {etherBalance && (
        <div className="balance">
          <br />
          Balance:
          <p className="bold">{formatEther(etherBalance)}</p>
        </div>
      )}
    </div>
  )
}
