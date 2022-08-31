import React, { useMemo } from 'react'
import { useEtherBalance, Connector, useEthers, useConnector } from '@usedapp/core'
import { ContentBlock, ContentRow, SectionRow } from '../base/base'
import { Title } from '../../typography/Title'
import styled from 'styled-components'
import { Colors } from '../../global/styles'
import { SendEthForm } from '../SendEthForm/SendEthForm'
import { formatEther } from '@ethersproject/units'
import { Label } from '../../typography/Label'
import { TextInline } from '../../typography/Text'
import { Button } from '../base/Button'

const STAKING_CONTRACT = '0x00000000219ab540356cBB839Cbe05303d7705Fa'

interface ConnectorProps {
  name: string
  connector: Connector
}

export function SingleConnector({ name, connector }: ConnectorProps) {
  const { connector: activeConnector } = useConnector()
  const { account, activate, deactivate, chainId } = useEthers()
  const ethBalance = useEtherBalance(account, { chainId })
  const stakingBalance = useEtherBalance(STAKING_CONTRACT, { chainId })

  const active = useMemo(() => !!account && activeConnector?.connector.name === name, [activeConnector, name])

  return (
    <>
      <SectionRow>
        <Title>{`${name} connector`}</Title>
        <Account>
          {active? (
            <>
              <LoginButton onClick={deactivate}>Disconnect</LoginButton>
            </>
          ) : (
            <LoginButton id={`${name}Button`} onClick={async () => activate(connector)}>
              Connect
            </LoginButton>
          )}
        </Account>
      </SectionRow>
      {active && (
        <ContentBlock>
          {account && (
            <ContentRow>
              <Label>Account:</Label> <TextInline>{account}</TextInline>{' '}
            </ContentRow>
          )}
          {ethBalance && (
            <ContentRow>
              <Label>Eth balance:</Label> <TextInline>{formatEther(ethBalance)}</TextInline> <Label>ETH</Label>
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
      )}
      <br />
      {active && <SendEthForm />}
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
