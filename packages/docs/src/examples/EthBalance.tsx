import React from 'react'
import ReactDOM from 'react-dom'
import { formatEther } from '@ethersproject/units'
import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config, Goerli } from '@usedapp/core'
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

export function App() {
  const { account, chainId, activateBrowserWallet, deactivate } = useEthers()
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
          Ether balance:
          <p className="bold">{formatEther(etherBalance)} ETH</p>
        </div>
      )}
    </div>
  )
}
