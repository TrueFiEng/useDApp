import { useBlockMeta, useBlockNumber, useChainCalls, useEthers } from '@usedapp/core'
import { Interface } from '@ethersproject/abi'
import { formatUnits } from '@ethersproject/units'
import { getAddress } from '@ethersproject/address'
import React, { useEffect, useState } from 'react'

const ERC20Interface = new Interface(['function balanceOf(address) view returns(uint256)'])
export function App() {
  const blockNumber = useBlockNumber()
  const { chainId, activateBrowserWallet, deactivate, account } = useEthers()
  const { timestamp, difficulty } = useBlockMeta()

  const [tokenList, setTokenList] = useState<any>();
  useEffect(() => {
    (async () => {
      const res = await fetch('https://wispy-bird-88a7.uniswap.workers.dev/?url=http://erc20.cmc.eth.link')
      setTokenList(await res.json())
    })()
  })

  const balances = useChainCalls(tokenList && account ? tokenList.tokens.map((token: any) => ({
    address: token.address,
    data: ERC20Interface.encodeFunctionData('balanceOf', ['0xa3b68EA817a1B9fe8365723cEFe23353BA5c47B1']),
  })) : []).map(data => data && ERC20Interface.decodeFunctionResult('balanceOf', data)[0])

  return (
    <div className="App">
      <p>Chain id: {chainId}</p>
      <p>Current block: {blockNumber}</p>
      {difficulty && <p>Current difficulty: {difficulty.toString()}</p>}
      {timestamp && <p>Current block timestamp: {timestamp.toLocaleString()}</p>}
      <div>
        <button onClick={() => activateBrowserWallet()}>Connect</button>
        <button onClick={() => deactivate()}>Disconnect</button>
      </div>
      {account && <p>Account: {account}</p>}
      <ul>
        {tokenList && tokenList.tokens.map((token: any, idx: number) => (
          <li>
            <img src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${getAddress(token.address)}/logo.png`}/>
            {token.name} - {balances?.[idx] && formatUnits(balances[idx], token.decimals)}
          </li>
        ))}
      </ul>
    </div>
  )
}
