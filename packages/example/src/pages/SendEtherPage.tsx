import React from 'react'
import { MainContent, Container, Section, SectionRow } from '../components/base/base'
import { Title } from '../typography/Title'
import { TransactionsList, NotificationsList } from '../components/Transactions/History'
import styled from 'styled-components'

import { AccountButton } from '../components/account/AccountButton'

import { SendEthForm } from '../components/SendEthForm/SendEthForm'

export const SendEtherPage = () => {
  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>Send Ether</Title>
            <AccountButton />
          </SectionRow>
          <SendEthForm />
          <NotificationsList />
        </Section>
      </Container>
    </MainContent>
  )
}

const TableGrid = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`
