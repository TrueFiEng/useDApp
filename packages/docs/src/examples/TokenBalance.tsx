import React from 'react'
import ReactDOM from 'react-dom'
import { formatEther } from '@ethersproject/units'
import { Mainnet, DAppProvider, useTokenBalance, useEthers, Config, Goerli } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

const DAI = {
  [Mainnet.chainId]: '0x6b175474e89094c44da98b954eedeac495271d0f',
  [Goerli.chainId]: '0x5C221E77624690fff6dd741493D735a17716c26B',
}

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

const ConnectButton = () => {
  const { account, deactivate, activateBrowserWallet } = useEthers()
  // 'account' being undefined means that we are not connected.
  if (account) return <button onClick={() => deactivate()}>Disconnect</button>
  else return <button onClick={() => activateBrowserWallet()}>Connect</button>
}

export function TokenBalance() {
  const { account, chainId } = useEthers()
  const daiBalance = useTokenBalance(DAI[chainId], account)
  if (chainId && !config.readOnlyUrls[chainId]) {
    return <p>Please use Mainnet for this example to work.</p>
  }

  return (
    <div>
      <ConnectButton />
      {daiBalance && (
        <div className="balance">
          Dai balance:
          <p className="bold">{formatEther(daiBalance)}</p>
        </div>
      )}
    </div>
  )
}
