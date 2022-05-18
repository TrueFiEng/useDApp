import React, { useEffect } from 'react'
import { MetamaskConnector, RpcConnector, useEtherBalance, useEthers } from '@usedapp/core'
import { Container, ContentBlock, ContentRow, MainContent, Section, SectionRow } from '../components/base/base'
import { Button } from '../components/base/Button'
import { Title } from '../typography/Title'
import styled from 'styled-components'
import { Colors } from '../global/styles'
import { formatEther } from '@ethersproject/units'
import { Label } from '../typography/Label'
import { TextInline } from '../typography/Text'
import { Web3Provider } from '@ethersproject/providers'

export const ConnectorPage = () => {
  const { account, activate, deactivate } = useEthers()
  const metamaskConnector = new MetamaskConnector()
  const rpcConnector = new RpcConnector('https://mainnet.infura.io/v3/d8df2cb7844e4a54ab0a782f608749dd')
  const ethBalance = useEtherBalance(account)

  useEffect(() => {
    const connectEagerly = async () => {
        await metamaskConnector.connectEagerly()
    }
    void connectEagerly()
  }, [])

  return (
    <>
      <MainContent>
        <Container>
          <Section>
            <SectionRow>
              <Title>Metamask Connector</Title>
              <Account>
                {account ? (
                  <>
                    <LoginButton onClick={deactivate}>Disconnect</LoginButton>
                  </>
                ) : (
                  <LoginButton onClick={() => {void activate(metamaskConnector.provider as Web3Provider)}}>Connect</LoginButton>
                )}
              </Account>
            </SectionRow>
            {/* <SectionRow>
              <Title>Rpc Connector</Title>
              <Account>
                {account ? (
                  <>
                    <LoginButton onClick={() => rpcConnector.deactivate()}>Disconnect</LoginButton>
                  </>
                ) : (
                  <LoginButton onClick={() => rpcConnector.activate()}>Connect</LoginButton>
                )}
              </Account>
            </SectionRow> */}
            <ContentBlock>
            {account && (
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
            </ContentBlock>
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
