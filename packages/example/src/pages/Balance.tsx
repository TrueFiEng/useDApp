import React from 'react'
import { formatEther } from '@ethersproject/units'
import { useEtherBalance, useEthers } from '@usedapp/core'
import { useCoingeckoPrice } from '@usedapp/coingecko'
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
  const etherePrice = useCoingeckoPrice('ethereum', 'usd')

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
            {etherePrice && (
              <ContentRow>
                <Label>Ether price:</Label> <Label>$ </Label>
                <TextInline>{etherePrice}</TextInline>
              </ContentRow>
            )}
          </ContentBlock>
        </Section>
      </Container>
    </MainContent>
  )
}
