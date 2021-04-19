import React from 'react'
import { useEthers } from '@usedapp/core'
import styled from 'styled-components'
import { Container, MainContent, Section, SectionRow } from '../components/base/base'
import { Button } from '../components/base/Button'
import { DepositEth, WithdrawEth } from '../components/Notifications/Forms'
import { NotificationsList, TransactionsList } from '../components/Notifications/History'
import { Title } from '../typography/Title'

export function Transactions() {
  const { activateBrowserWallet, deactivate, account } = useEthers()

  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>Transactions</Title>
            {account && <Button onClick={deactivate}>Disconnect</Button>}
            {!account && <Button onClick={activateBrowserWallet}>Connect</Button>}
          </SectionRow>
          <TableGrid>
            <DepositEth />
            <WithdrawEth />
            <TransactionsList />
            <NotificationsList />
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
