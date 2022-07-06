import React from 'react'
import { useEtherBalance } from '@usedapp/core'
import { useEthers } from '@usedapp/core'
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
  connectorClass: any
}

export function SingleConnector({ name, connectorClass }: ConnectorProps) {
  const { account, activate, deactivate, chainId, connector } = useEthers()
  const ethBalance = useEtherBalance(account, { chainId })
  const stakingBalance = useEtherBalance(STAKING_CONTRACT, { chainId })

  return (
    <>
      <SectionRow>
        <Title>{`${name} connector`}</Title>
        <Account>
          {connector?.connector.name === name ? (
            <>
              <LoginButton onClick={deactivate}>Disconnect</LoginButton>
            </>
          ) : (
            <LoginButton id={`${name}Button`} onClick={async () => activate(connectorClass)}>
              Connect
            </LoginButton>
          )}
        </Account>
      </SectionRow>
      {account && connector?.connector.name === name && account && <ContentBlock>
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
      </ContentBlock>}
      <br />
      {account && connector?.connector.name === name && account && account && <SendEthForm />}
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
