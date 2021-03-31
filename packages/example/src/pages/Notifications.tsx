import { useEtherBalance, useEthers } from '@usedapp/core'
import { Container, ContentBlock, ContentRow, MainContent, Section, SectionRow } from '../components/base/base'
import { Button } from '../components/base/Button'
import { formatEther } from '@ethersproject/units'
import styled from 'styled-components'

import { Title } from '../typography/Title'

export function Notifications() {
  const { activateBrowserWallet, deactivate, account } = useEthers()
  const etherBalance = useEtherBalance(account)

  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>Notifications</Title>
            {account && <Button onClick={deactivate}>Disconnect</Button>}
            {!account && <Button onClick={activateBrowserWallet}>Connect</Button>}
          </SectionRow>
          <ContentBlock>
            <ContentRow>Deposit ether:</ContentRow>
            {etherBalance && <ContentRow>Your ether balance: {formatEther(etherBalance)}</ContentRow>}
            <ContentRow>
              <label>How much?</label>
              <Input type="number" step="0.01" />
            </ContentRow>
            <ContentRow>
              <SmallButton disabled={true}>Send</SmallButton>
            </ContentRow>
          </ContentBlock>
        </Section>
      </Container>
    </MainContent>
  )
}

const SmallButton = styled(Button)`
  min-width: unset;
  height: unset;
  padding: 5px 20px;
`

const Input = styled.input`
  margin-left: 10px;
  padding: 4px;
`
