import React from 'react'
import styled from 'styled-components'
import { formatUnits } from '@ethersproject/units'
import { ERC20Interface, useContractCalls, useEthers, useTokenList } from '@usedapp/core'
import { Colors } from '../../global/styles'
import { TextBold } from '../../typography/Text'
import { TokenIcon } from './TokenIcon'
import { adjustIPFSPath } from '../../utils'

const UNISWAP_DEFAULT_TOKEN_LIST_URI = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'

function useTokensBalance(tokenList?: any[], account?: string | null) {
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

export function TokenList() {
  const { account, chainId } = useEthers()
  const { name, logoURI, tokens } = useTokenList(UNISWAP_DEFAULT_TOKEN_LIST_URI, chainId) || {}
  const balances = useTokensBalance(tokens, account)

  // return (
  //   <List>
  //     <ListTitleRow>
  //       <ListTitle>{name}</ListTitle>
  //       {logoURI && <ListLogo src={adjustIPFSPath(logoURI)} alt={`${name} logo`} />}
  //     </ListTitleRow>
  //     {tokens &&
  //       tokens.map((token, idx) => (
  //         <TokenItem key={token.address}>
  //           <TokenIconContainer>
  //             {token.logoURI && <TokenIcon src={token.logoURI} alt={`${token.symbol} logo`} />}
  //           </TokenIconContainer>
  //           <TokenName>{token.name}</TokenName>
  //           <TokenTicker>{token.symbol}</TokenTicker>
  //           {balances?.[idx] && <TokenBalance>{formatUnits(balances[idx]![0], token.decimals)}</TokenBalance>}
  //         </TokenItem>
  //       ))}
  //   </List>
  // )
  const httpSource = logoURI && logoURI.startsWith('ipfs') ? logoURI.replace('ipfs://', 'https://ipfs.io/ipfs/') : logoURI
  return (
    <div>
      <div>
        {name}
        {httpSource && <img src={httpSource} alt={name}/>}
      </div>
      <ol>
        {tokens?.map(token => (
          <li>
            <ul>
              <li>Name: {token.name}</li>
              <li>Symbol: {token.symbol}</li>
              <li>Decimals: {token.decimals}</li>
              <li>Address: {token.address}</li>
            </ul>
          </li>
        ))}
      </ol>
    </div>
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
