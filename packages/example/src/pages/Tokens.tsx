import { formatUnits } from '@ethersproject/units'
import uniswapToken from '@uniswap/default-token-list'
import { ChainId, ERC20Interface, useContractCalls, useEthers } from '@usedapp/core'
import React from 'react'
import styled from 'styled-components'

function getTokenList(chainId?: ChainId) {
  return uniswapToken.tokens.filter((token) => token.chainId == chainId)
}

function useTokensBalance(tokenList: any[], account?: string | null) {
  return useContractCalls(
    tokenList && account
      ? tokenList.map((token: any) => ({
          abi: ERC20Interface,
          address: token.address,
          method: 'balanceOf',
          args: [account],
        }))
      : []
  )
}

export function Tokens() {
  const { chainId, activateBrowserWallet, deactivate, account } = useEthers()
  const tokenList = getTokenList(chainId)
  const balances = useTokensBalance(tokenList, account)

  return (
    <div>
      {account && <button onClick={() => deactivate()}>Disconnect</button>}
      {!account && <button onClick={() => activateBrowserWallet()}>Connect</button>}
      <TokenList>
        {tokenList &&
          tokenList.map((token, idx) => (
            <TokenItem>
              <TokenIconContainer>
                <TokenIcon src={token.logoURI} />
              </TokenIconContainer>
              <TokenName>{token.name}</TokenName>
              <TokenTicker>{token.symbol}</TokenTicker>
              <TokenBalance>{balances?.[idx] && formatUnits(balances[idx]![0], token.decimals)}</TokenBalance>
            </TokenItem>
          ))}
      </TokenList>
    </div>
  )
}

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
