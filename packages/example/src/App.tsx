import { Interface } from '@ethersproject/abi'
import { formatUnits, formatEther } from '@ethersproject/units'
import { getAddress } from '@ethersproject/address'
import React, { useEffect, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { useBlockMeta, useBlockNumber, useEthers, useChainCalls, useEtherBalance } from '@usedapp/core'

const ERC20Interface = new Interface(['function balanceOf(address) view returns(uint256)'])

export function App() {
  const blockNumber = useBlockNumber()
  const { chainId, activateBrowserWallet, deactivate, account } = useEthers()
  const { timestamp, difficulty } = useBlockMeta()
  const etherBalance = useEtherBalance(account)

  const [tokenList, setTokenList] = useState<any>()
  useEffect(() => {
    ;(async () => {
      const res = await fetch('https://wispy-bird-88a7.uniswap.workers.dev/?url=http://erc20.cmc.eth.link')
      setTokenList(await res.json())
    })()
  })

  // TODO(marik-d): Fix this and use existing hook and currency value class.
  const balances = useChainCalls(
    tokenList && account
      ? tokenList.tokens.map((token: any) => ({
          address: token.address,
          data: ERC20Interface.encodeFunctionData('balanceOf', [account]),
        }))
      : []
  ).map((data) => {
    return data && ERC20Interface.decodeFunctionResult('balanceOf', data)[0]
  })

  return (
    <Background>
      <Global />
      <div>
        <p>Chain id: {chainId}</p>
        <p>Current block: {blockNumber}</p>
        {difficulty && <p>Current difficulty: {difficulty.toString()}</p>}
        {timestamp && <p>Current block timestamp: {timestamp.toLocaleString()}</p>}
        {etherBalance && <p>Ether balance: {formatEther(etherBalance)} ETH </p>}
        <div>
          <button onClick={() => activateBrowserWallet()}>Connect</button>
          <button onClick={() => deactivate()}>Disconnect</button>
        </div>
        {account && <p>Account: {account}</p>}
      </div>
      <TokenList>
        {tokenList &&
          tokenList.tokens.map((token: any, idx: number) => (
            <TokenItem>
              <TokenIconContainer>
                <TokenIcon
                  src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${getAddress(
                    token.address
                  )}/logo.png`}
                />
              </TokenIconContainer>
              <TokenName>{token.name}</TokenName>
              <TokenTicker>{token.symbol}</TokenTicker>
              <TokenBalance>{balances?.[idx] && formatUnits(balances[idx], token.decimals)}</TokenBalance>
            </TokenItem>
          ))}
      </TokenList>
    </Background>
  )
}

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
    overflow: auto;
  }
`

const Background = styled.div`
  background-color: #f3f4f9;
  overflow: auto;
  min-height: 100vh;
`

const TokenList = styled.ul`
  background-color: white;
  border-radius: 16px;
  margin: auto;
  margin-top: 64px;
  padding: 16px 16px 16px 16px;
  max-width: 640px;
`

const TokenItem = styled.li`
  display: grid;
  grid-template-areas:
    'icon name balance'
    'icon ticker balance';
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 16px;
  margin: 8px;
  margin-top: 16px;
  align-items: center;
`

const TokenIconContainer = styled.div`
  grid-area: icon;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #f2f7fb;
`

const TokenIcon = styled.img`
  width: 32px;
  height: 32px;
  margin: 16px;
`

const TokenName = styled.span`
  grid-area: name;
`

const TokenTicker = styled.span`
  grid-area: ticker;
  color: gray;
`

const TokenBalance = styled.span`
  grid-area: balance;
  font-size: 1.5em;
`
