import React from 'react'
import styled from 'styled-components'
import { Container, ContentBlock, MainContent, Section, SectionRow } from '../components/base/base'
import { TokenList } from '../components/TokenList/TokenList'
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
            <TokenList />
          </TokensContentBlock>
        </Section>
      </Container>
    </MainContent>
  )
}

const TokensContentBlock = styled(ContentBlock)`
  padding: 16px 32px;
`
