import React from 'react'
import ReactDOM from 'react-dom'
import { formatEther } from '@ethersproject/units'
import { Mainnet, DAppProvider, useTokenBalance, useEthers, Config } from '@usedapp/core'

const DAI = '0x6b175474e89094c44da98b954eedeac495271d0f'

const config: Config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
      [Mainnet.chainId]: 'https://mainnet.infura.io/v3/57fc2c19095745e59ab96a4aa87dada8',
    },
}

ReactDOM.render(
    <DAppProvider config={config}>
      <TokenBalance />
    </DAppProvider>,
    document.getElementById('root')
)

export function TokenBalance() {
  const { account, activateBrowserWallet } = useEthers()
  const daiBalance = useTokenBalance(DAI, account)

  return (
    <div>
      {!account && <button onClick={activateBrowserWallet}> Connect </button>}
      {daiBalance && <p>Dai balance: {formatEther(daiBalance)}</p>}
    </div>
  )
}