import React from 'react'
import { AccountButton } from '../components/account/AccountButton'
import { Container, MainContent, Section, SectionRow } from '../components/base/base'
import { SendEthForm } from '../components/SendEthForm/SendEthForm'
import { NotificationsList } from '../components/Transactions/History'
import { Title } from '../typography/Title'

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
