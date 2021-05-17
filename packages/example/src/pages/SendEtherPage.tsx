import React from 'react'
import { MainContent, Container, Section, SectionRow } from '../components/base/base'
import { Button } from '../components/base/Button'
import { useEthers } from '@usedapp/core'
import { Title } from '../typography/Title'
import { TransactionsList, NotificationsList } from '../components/Transactions/History'
import styled from 'styled-components'

import { SendEthForm } from '../components/SendEthForm/SendEthForm'

export const SendEtherPage = () => {
  const { account, deactivate, activateBrowserWallet } = useEthers()

  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>Send Ether</Title>
            {account && <Button onClick={deactivate}>Disconnect</Button>}
            {!account && <Button onClick={activateBrowserWallet}>Connect</Button>}
          </SectionRow>
          <SendEthForm />
          <TableGrid>
            <TransactionsList />
            <NotificationsList />
          </TableGrid>
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
