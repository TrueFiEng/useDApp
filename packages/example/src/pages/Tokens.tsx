import React from 'react'
import styled from 'styled-components'
import { Container, ContentBlock, MainContent, Section, SectionRow } from '../components/base/base'
import { TokensList } from '../components/TokensList/TokensList'
import { Title } from '../typography/Title'

import { AccountButton } from '../components/account/AccountButton'

export function Tokens() {
  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>Tokens</Title>
            <AccountButton />
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
