import React from 'react'
import ReactDOM from 'react-dom'

import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config, Goerli } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import { getDefaultProvider } from 'ethers'

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
  const { account, deactivate, chainId, activateBrowserWallet } = useEthers()
  const etherBalance = useEtherBalance(account)
  if (chainId && !config.readOnlyUrls[chainId]) {
    return <p>Please use either Mainnet or Goerli testnet.</p>
  }

  const ConnectButton = () => {
    // 'account' being undefined means that we are not connected.
    if (account) return <button onClick={() => deactivate()}>Disconnect</button>
    else return <button onClick={() => activateBrowserWallet()}>Connect</button>
  }

  return (
    <div>
      <ConnectButton />
      {etherBalance && (
        <div className="balance">
          <br />
          Address:
          <p className="bold">{account}</p>
          <br />
          Balance:
          <p className="bold">{formatEther(etherBalance)}</p>
        </div>
      )}
    </div>
  )
}
