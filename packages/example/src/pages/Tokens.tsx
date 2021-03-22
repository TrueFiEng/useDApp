import { useEthers } from '@usedapp/core'
import React from 'react'
import styled from 'styled-components'
import { Container, ContentBlock, MainContent, Section, SectionRow } from '../components/base/base'
import { Button } from '../components/base/Button'
import { TokensList } from '../components/TokensList/TokensList'
import { Title } from '../typography/Title'

export function Tokens() {
  const { activateBrowserWallet, deactivate, account } = useEthers()

  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>Tokens</Title>
            {account && <Button onClick={deactivate}>Disconnect</Button>}
            {!account && <Button onClick={activateBrowserWallet}>Connect</Button>}
          </SectionRow>
          <TokensContentBlock>
            <TokensList />
          </TokensContentBlock>
        </Section>
      </Container>
    </MainContent>
  )
}

const TokensContentBlock = styled(ContentBlock)`
  padding: 16px 32px;
`
