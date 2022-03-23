import React from 'react'
import ReactDOM from 'react-dom'
import { formatEther } from '@ethersproject/units'
import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config } from '@usedapp/core'

const config: Config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
      [Mainnet.chainId]: 'https://mainnet.infura.io/v3/57fc2c19095745e59ab96a4aa87dada8',
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