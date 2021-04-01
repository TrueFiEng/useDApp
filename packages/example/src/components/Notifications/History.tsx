import type { TransactionResponse } from '@ethersproject/providers'
import { getExplorerTransactionLink, Notification, useNotifications, useTransactions } from '@usedapp/core'
import type { ReactNode } from 'react'
import styled from 'styled-components'
import { TextBold } from '../../typography/Text'
import { ContentBlock } from '../base/base'
import { CheckIcon } from './Icons/CheckIcon'
import { ClockIcon } from './Icons/ClockIcon'
import { ExclamationIcon } from './Icons/ExclamationIcon'
import { SpinnerIcon } from './Icons/SpinnerIcon'

interface TableWrapperProps {
  children: ReactNode
  title: string
}

const TableWrapper = ({ children, title }: TableWrapperProps) => (
  <ContentBlock>
    <CellTitle>{title}</CellTitle>
    <Table>{children}</Table>
  </ContentBlock>
)

export const TransactionsList = () => {
  const { transactions } = useTransactions()
  const reversed = [...transactions].reverse()

  return (
    <TableWrapper title="Transactions history">
      {reversed.map((tx) => (
        <TransactionDetailsWrapper key={tx.transaction.hash}>
          {!tx.receipt && (
            <IconContainer>
              <SpinnerIcon />
            </IconContainer>
          )}
          <div>{tx.transaction.hash.slice(0, 6) + '...' + tx.transaction.hash.slice(-4)}</div>
        </TransactionDetailsWrapper>
      ))}
    </TableWrapper>
  )
}

interface NotificationPanelProps {
  title: string
  icon: ReactNode
  transaction: TransactionResponse
}

const NotificationPanel = ({ title, icon, transaction }: NotificationPanelProps) => {
  return (
    <NotificationWrapper>
      <IconContainer>{icon}</IconContainer>
      <NotificationDetailsWrapper>
        <TextBold>{title}</TextBold>
        <Link
          href={getExplorerTransactionLink(transaction.hash, transaction.chainId)}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Etherscan
        </Link>
      </NotificationDetailsWrapper>
    </NotificationWrapper>
  )
}

interface NotificationItemProps {
  notification: Notification
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  switch (notification.type) {
    case 'transactionStarted':
      return (
        <NotificationPanel title="Transaction started" icon={<ClockIcon />} transaction={notification.transaction} />
      )
    case 'transactionFailed':
      return (
        <NotificationPanel
          title="Transaction failed"
          icon={<ExclamationIcon />}
          transaction={notification.transaction}
        />
      )
    case 'transactionSucceed':
      return (
        <NotificationPanel title="Transaction succeed" icon={<CheckIcon />} transaction={notification.transaction} />
      )
    default:
      return null
  }
}

export const NotificationsList = () => {
  const { notifications } = useNotifications()
  const reversed = [...notifications].reverse()

  return (
    <TableWrapper title="Notifications history">
      {reversed.map((nx) => (
        <NotificationItem key={JSON.stringify(nx)} notification={nx} />
      ))}
    </TableWrapper>
  )
}

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  padding: 8px;
  margin-right: 10px;
`

const TransactionDetailsWrapper = styled.div`
  display: flex;
  align-items: center;
`

const NotificationWrapper = styled.div`
  display: flex;
`

const NotificationDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const Table = styled.div`
  height: 300px;
  overflow: scroll;

  & > * + * {
    margin-top: 10px;
  }
`

const CellTitle = styled(TextBold)`
  font-size: 20px;
  margin-bottom: 10px;
`

const Link = styled.a`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
`
