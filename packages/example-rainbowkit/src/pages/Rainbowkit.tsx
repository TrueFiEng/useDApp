import React from 'react'
import { Container, MainContent, Section, SectionRow, ContentBlock, ContentRow } from '../components/base/base'
import { Title } from '../typography/Title'
import { Label } from '../typography/Label'
import { TextInline } from '../typography/Text'
import { ConnectButton } from '@usedapp/rainbowkit'
import { formatEther } from '@ethersproject/units'
import { useEthers, useEtherBalance } from '@usedapp/core'

export function RainbowkitPage() {
  const { account, chainId } = useEthers()
  const userBalance = useEtherBalance(account, { chainId })

  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>Rainbowkit</Title>
            <ConnectButton />
          </SectionRow>
          <ContentBlock>
            {!account && !userBalance && (
              <ContentRow>
                <Label>Account:</Label> <TextInline id="balance-page-account">Not connected</TextInline>
              </ContentRow>
            )}
            {account && (
              <ContentRow>
                <Label>Account:</Label> <TextInline id="balance-page-account">{account}</TextInline>
              </ContentRow>
            )}
            {userBalance && (
              <ContentRow>
                <Label>Ether balance:</Label>{' '}
                <TextInline id="balance-page-balance">{formatEther(userBalance)}</TextInline> <Label>ETH</Label>
              </ContentRow>
            )}
            {account && chainId && (
              <ContentRow>
                <Label>Current chain id:</Label> <TextInline id="balance-page-chainid">{chainId}</TextInline>
              </ContentRow>
            )}
          </ContentBlock>
        </Section>
      </Container>
    </MainContent>
  )
}
