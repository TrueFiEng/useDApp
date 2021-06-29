import React from 'react'
import styled from 'styled-components'
import { AccountButton } from '../components/account/AccountButton'
import { Container, MainContent, Section, SectionRow } from '../components/base/base'
import { DepositEth, WithdrawEth } from '../components/Transactions/Forms'
import { Title } from '../typography/Title'

export function Transactions() {
  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>Transactions</Title>
            <AccountButton />
          </SectionRow>
          <TableGrid>
            <DepositEth />
            <WithdrawEth />
          </TableGrid>
        </Section>
      </Container>
    </MainContent>
  )
}

const TableGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`
