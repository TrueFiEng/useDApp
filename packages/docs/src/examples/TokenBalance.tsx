import React from 'react'
import ReactDOM from 'react-dom'
import { formatEther } from '@ethersproject/units'
import { Mainnet, DAppProvider, useTokenBalance, useEthers, Config, Goerli } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import { MetamaskConnect } from './components/MetamaskConnect'

const DAI = '0x6b175474e89094c44da98b954eedeac495271d0f'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
    [Goerli.chainId]: getDefaultProvider('goerli'),
  },
}

ReactDOM.render(
  <DAppProvider config={config}>
    <TokenBalance />
  </DAppProvider>,
  document.getElementById('root')
)

export function TokenBalance() {
  const { account, chainId } = useEthers()
  const daiBalance = useTokenBalance(DAI, account)
  if (!config.readOnlyUrls[chainId]) {
    return <p>Please use either Mainnet or Goerli testnet.</p>
  }

  return (
    <div>
      <MetamaskConnect />
      {daiBalance && (
        <div className="balance">
          Dai balance:
          <p className="bold">{formatEther(daiBalance)}</p>
        </div>
      )}
    </div>
  )
}
