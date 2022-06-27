import React from 'react'
import { MetamaskConnector, WalletConnectConnector, useEtherBalance, useEthers } from '@usedapp/core'
import { Container, ContentBlock, ContentRow, MainContent, Section, SectionRow } from '../components/base/base'
import { Button } from '../components/base/Button'
import { Title } from '../typography/Title'
import styled from 'styled-components'
import { Colors } from '../global/styles'
import { formatEther } from '@ethersproject/units'
import { Label } from '../typography/Label'
import { TextInline } from '../typography/Text'
import { SendEthForm } from '../components/SendEthForm/SendEthForm'

const STAKING_CONTRACT = '0x00000000219ab540356cBB839Cbe05303d7705Fa'

export const ConnectorPage = () => {
  const { account, activate, deactivate, chainId, connector } = useEthers()
  const ethBalance = useEtherBalance(account, {chainId})
  const stakingBalance = useEtherBalance(STAKING_CONTRACT, { chainId })

  return (
    <>
      <MainContent>
        <Container>
          <Section>
            <SectionRow>
              <Title>Metamask Connector</Title>
              <Account>
                {connector?.connector.name === 'Metamask' ? (
                  <>
                    <LoginButton onClick={deactivate}>Disconnect</LoginButton>
                  </>
                ) : (
                  <LoginButton id='metamaskButton' onClick={async () => activate(MetamaskConnector)}>Connect</LoginButton>
                )}
              </Account>
            </SectionRow>
            <SectionRow>
              <Title>WalletConnect Connector</Title>
              <Account>
                {connector?.connector.name === 'WalletConnect' ? (
                  <>
                    <LoginButton onClick={deactivate}>Disconnect</LoginButton>
                  </>
                ) : (
                  <LoginButton id='walletConnectButton' onClick={() => activate(WalletConnectConnector)}>Connect</LoginButton>
                )}
              </Account>
            </SectionRow>
            <ContentBlock>
            {(connector?.connector.name === 'Metamask' || connector?.connector.name === 'WalletConnect') &&
            
            account && (
            <ContentRow>
                <Label>Account:</Label> <TextInline>{account}</TextInline>{' '}
            </ContentRow>
            )}
            {ethBalance && (
            <ContentRow>
                <Label>Eth balance:</Label> <TextInline>{formatEther(ethBalance)}</TextInline>{' '}
                <Label>ETH</Label>
            </ContentRow>
            )}
            {chainId && (          
            <ContentRow>
                <Label>Chain Id:</Label> <TextInline>{chainId}</TextInline>{' '}
            </ContentRow>
            )}
            {stakingBalance && (
              <ContentRow>
                <Label>ETH2 staking contract holds:</Label> <TextInline>{formatEther(stakingBalance)}</TextInline>{' '}
                <Label>ETH</Label>
              </ContentRow>
            )}
            </ContentBlock>
            <br />
            {account && <SendEthForm />}
          </Section>
        </Container>
      </MainContent>
    </>
  )
}

const Account = styled.div`
  display: flex;
  align-items: center;
`

const LoginButton = styled(Button)`
  background-color: ${Colors.Yellow[100]};
`
