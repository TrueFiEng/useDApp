import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { getAddress } from '@ethersproject/address'
import { ERC20Interface, useContractCalls, useEthers } from '@usedapp/core'
import { formatUnits } from '@ethersproject/units'

export function Tokens() {
  const { account } = useEthers()
  const [tokenList, setTokenList] = useState<any>()
  useEffect(() => {
    ;(async () => {
      const res = await fetch('https://wispy-bird-88a7.uniswap.workers.dev/?url=http://erc20.cmc.eth.link')
      setTokenList(await res.json())
    })()
  }, [])

  const balances = useContractCalls(
    tokenList && account
      ? tokenList.tokens.map((token: any) => ({
          abi: ERC20Interface,
          address: token.address,
          method: 'balanceOf',
          args: [account],
        }))
      : []
  )

  return (
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
            <TokenBalance>{balances?.[idx] && formatUnits(balances[idx]![0], token.decimals)}</TokenBalance>
          </TokenItem>
        ))}
    </TokenList>
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
