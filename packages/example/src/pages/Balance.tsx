import { formatUnits, formatEther } from '@ethersproject/units'
import React from 'react'
import { useEthers, useEtherBalance, ChainId, useTokenBalance } from '@usedapp/core'

const DAI_ADDRESSES = {
  [ChainId.Mainnet]: '0x6b175474e89094c44da98b954eedeac495271d0f',
  [ChainId.Ropsten]: '0xad6d458402f60fd3bd25163575031acdce07538d',
  [ChainId.Kovan]: '0xc4375b7de8af5a38a93548eb8453a498222c4ff2',
  [ChainId.Rinkeby]: '0x95b58a6bff3d14b7db2f5cb5f0ad413dc2940658',
  [ChainId.Goerli]: '0x73967c6a0904aa032c103b4104747e88c566b1a2',
  [ChainId.xDai]: undefined,
}

export function Balance() {
  const { chainId, activateBrowserWallet, deactivate, account } = useEthers()
  const etherBalance = useEtherBalance(account)
  const daiBalance = useTokenBalance(account, chainId && DAI_ADDRESSES[chainId])

  return (
    <div>
      {etherBalance && <p>Ether balance: {formatEther(etherBalance)} ETH </p>}
      {daiBalance && <p>Dai balance: {formatUnits(daiBalance, 18)} DAI</p>}
      <div>
        <button onClick={() => activateBrowserWallet()}>Connect</button>
        <button onClick={() => deactivate()}>Disconnect</button>
      </div>
      {account && <p>Account: {account}</p>}
    </div>
  )
}
