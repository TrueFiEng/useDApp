import { formatUnits } from '@ethersproject/units'
import uniswapToken from '@uniswap/default-token-list'
import { ChainId, ERC20Interface, useContractCalls, useEthers } from '@usedapp/core'
import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../global/styles'
import { TextBold } from '../../typography/Text'
import { TokenIcon } from './TokenIcon'

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

export function TokensList() {
  const { chainId, account } = useEthers()
  const tokenList = getTokenList(chainId)
  const balances = useTokensBalance(tokenList, account)

  return (
    <List>
      {tokenList &&
        tokenList.map((token, idx) => (
          <TokenItem key={token.address}>
            <TokenIconContainer>
              <TokenIcon src={token.logoURI} alt={`${token.symbol} logo`} />
            </TokenIconContainer>
            <TokenName>{token.name}</TokenName>
            <TokenTicker>{token.symbol}</TokenTicker>
            {balances?.[idx] && <TokenBalance>{formatUnits(balances[idx]![0], token.decimals)}</TokenBalance>}
          </TokenItem>
        ))}
    </List>
  )
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const TokenItem = styled.li`
  display: grid;
  grid-template-areas:
    'icon name balance'
    'icon ticker balance';
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto;
  grid-column-gap: 20px;
  grid-row-gap: 8px;
  align-items: center;
  height: 84px;
  padding: 12px 0;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;

  & + & {
    border-top: 1px solid ${Colors.Black[200]};
  }
`

const TokenIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: icon;
  width: 48px;
  height: 48px;
  padding: 1px;
  font-size: 36px;
  line-height: 36px;
  border: 1px solid ${Colors.Gray[300]};
  border-radius: 50%;
`

const TokenName = styled(TextBold)`
  grid-area: name;
`

const TokenTicker = styled(TextBold)`
  grid-area: ticker;
  color: ${Colors.Gray[600]};
`

const TokenBalance = styled(TextBold)`
  grid-area: balance;
  font-size: 20px;
  line-height: 32px;
`
