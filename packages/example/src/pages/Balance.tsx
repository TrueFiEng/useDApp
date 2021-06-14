import React from 'react'
import { formatEther } from '@ethersproject/units'
import { useEtherBalance, useEthers } from '@usedapp/core'
import { useCoingeckoPrice, useCoingeckoTokenPrice } from '@usedapp/coingecko'
import { Container, ContentBlock, ContentRow, MainContent, Section, SectionRow } from '../components/base/base'
import { Label } from '../typography/Label'
import { TextInline } from '../typography/Text'
import { Title } from '../typography/Title'

import { AccountButton } from '../components/account/AccountButton'

const STAKING_CONTRACT = '0x00000000219ab540356cBB839Cbe05303d7705Fa'

export function Balance() {
  const { account } = useEthers()
  const userBalance = useEtherBalance(account)
  const stakingBalance = useEtherBalance(STAKING_CONTRACT)
  const etherPrice = useCoingeckoPrice('ethereum', 'usd')
  const WETH_CONTRACT = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
  const wethPrice = useCoingeckoTokenPrice(WETH_CONTRACT, 'usd')

  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>Balance</Title>
            <AccountButton />
          </SectionRow>
          <ContentBlock>
            {stakingBalance && (
              <ContentRow>
                <Label>ETH2 staking contract holds:</Label> <TextInline>{formatEther(stakingBalance)}</TextInline>{' '}
                <Label>ETH</Label>
              </ContentRow>
            )}
            {account && (
              <ContentRow>
                <Label>Account:</Label> <TextInline>{account}</TextInline>
              </ContentRow>
            )}
            {userBalance && (
              <ContentRow>
                <Label>Ether balance:</Label> <TextInline>{formatEther(userBalance)}</TextInline> <Label>ETH</Label>
              </ContentRow>
            )}
            {etherPrice && (
              <ContentRow>
                <Label>Ethereum price:</Label> <Label>$ </Label>
                <TextInline>{etherPrice}</TextInline>
              </ContentRow>
            )}
            {wethPrice && (
              <ContentRow>
                <Label>WETH price:</Label> <Label>$ </Label>
                <TextInline>{wethPrice}</TextInline>
              </ContentRow>
            )}
          </ContentBlock>
        </Section>
      </Container>
    </MainContent>
  )
}
