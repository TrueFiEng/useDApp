import React from 'react'
import ReactDOM from 'react-dom'
import { formatEther } from '@ethersproject/units'
import { Mainnet, DAppProvider, useTokenBalance, useEthers, Config, Goerli } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

const DAI = '0x6b175474e89094c44da98b954eedeac495271d0f'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet')
  },
}

ReactDOM.render(
  <DAppProvider config={config}>
    <TokenBalance />
  </DAppProvider>,
  document.getElementById('root')
)

export function TokenBalance() {
  const { account, chainId, activateBrowserWallet, deactivate } = useEthers()
  const daiBalance = useTokenBalance(DAI, account)
  if (chainId && !config.readOnlyUrls[chainId]) {
    return <p>Please use Mainnet for this example to work.</p>
  }

  const ConnectButton = () => {
    // 'account' being undefined means that we are not connected.
    if(account) return <button onClick={() => deactivate()}>Disconnect</button>
    else return <button onClick={() => activateBrowserWallet()}>Connect</button>
  }

  return (
    <div>
      <ConnectButton/>
      {daiBalance && (
        <div className="balance">
          Dai balance:
          <p className="bold">{formatEther(daiBalance)}</p>
        </div>
      )}
    </div>
  )
}
