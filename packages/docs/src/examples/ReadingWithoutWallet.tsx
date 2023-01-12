import { formatEther } from '@ethersproject/units'
import { Config, DAppProvider, Goerli, Mainnet, useEtherBalance } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import React from 'react'
import ReactDOM from 'react-dom'

const STAKING_CONTRACT = '0x00000000219ab540356cBB839Cbe05303d7705Fa'

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
  const etherBalance = useEtherBalance(STAKING_CONTRACT)

  return (
    <div>
      {etherBalance && (
        <div className="balance">
          Staking contract balance:
          <p className="bold">{formatEther(etherBalance)} ETH</p>
        </div>
      )}
    </div>
  )
}
