import React from 'react'
import ReactDOM from 'react-dom'
import { formatEther } from '@ethersproject/units'
import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

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

export function App() {
  const { account, activateBrowserWallet } = useEthers()
  const etherBalance = useEtherBalance(account)

  return (
    <div>
      {!account && <button onClick={activateBrowserWallet}> Connect </button>}
      {etherBalance && <p>Ether balance: {formatEther(etherBalance)}</p>}
    </div>
  )
}