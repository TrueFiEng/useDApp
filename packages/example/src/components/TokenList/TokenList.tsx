import React from 'react'
import styled from 'styled-components'
import { formatUnits } from '@ethersproject/units'
import { ERC20Interface, useCalls, useEthers, useTokenList } from '@usedapp/core'
import { Colors } from '../../global/styles'
import { TextBold } from '../../typography/Text'
import { TokenIcon } from './TokenIcon'
import { toHttpPath } from '../../utils'
import { Contract } from 'ethers'

const UNISWAP_DEFAULT_TOKEN_LIST_URI = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'

function useTokensBalance(tokenList?: any[], account?: string | null) {
  return useCalls(
    tokenList && account
      ? tokenList.map((token: any) => ({
          contract: new Contract(token.address, ERC20Interface),
          method: 'balanceOf',
          args: [account],
        }))
      : []
  )
}

export function TokenList() {
  const { account, chainId } = useEthers()
  const { name, logoURI, tokens } = useTokenList(UNISWAP_DEFAULT_TOKEN_LIST_URI, chainId) || {}
  const balances = useTokensBalance(tokens, account)

  return (
    <List>
      <ListTitleRow>
        <ListTitle>{name}</ListTitle>
        {logoURI && <ListLogo src={toHttpPath(logoURI)} alt={`${name} logo`} />}
      </ListTitleRow>
      {tokens &&
        tokens.map((token, idx) => {
          const balance = balances[idx]
          return (
            <TokenItem key={token.address}>
              <TokenIconContainer>
                {token.logoURI && <TokenIcon src={token.logoURI} alt={`${token.symbol} logo`} />}
              </TokenIconContainer>
              <TokenName>{token.name}</TokenName>
              <TokenTicker>{token.symbol}</TokenTicker>
              {balance && !balance.error && (
                <TokenBalance>{formatUnits(balance.value[0], token.decimals)}</TokenBalance>
              )}
            </TokenItem>
          )
        })}
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

const ListTitleRow = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
`

const ListTitle = styled(TextBold)`
  margin-right: 10px;
  font-size: 18px;
`

const ListLogo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`
