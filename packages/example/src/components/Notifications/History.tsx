import type { TransactionResponse } from '@ethersproject/providers'
import {
  getExplorerTransactionLink,
  Notification,
  StoredTransaction,
  useNotifications,
  useTransactions,
} from '@usedapp/core'
import React, { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'
import { TextBold } from '../../typography/Text'
import { ContentBlock } from '../base/base'
import { CheckIcon } from './Icons/CheckIcon'
import { ClockIcon } from './Icons/ClockIcon'
import { ExclamationIcon } from './Icons/ExclamationIcon'
import { SpinnerIcon } from './Icons/SpinnerIcon'
import { WalletIcon } from './Icons/WalletIcon'
import { Colors } from '../../global/styles'
import { UnwrapIcon } from './Icons/UnwrapIcon'
import { WrapIcon } from './Icons/WrapIcon'

interface TableWrapperProps {
  children: ReactNode
  title: string
}

const TableWrapper = ({ children, title }: TableWrapperProps) => (
  <SmallContentBlock>
    <TitleRow>{title}</TitleRow>
    <Table>{children}</Table>
  </SmallContentBlock>
)

interface TransactionProps {
  transaction: StoredTransaction
}

const Transaction = ({ transaction }: TransactionProps) => {
  const date = new Date(transaction.submittedAt)
  const formattedDate = date.toLocaleDateString()
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })

  return (
    <TransactionDetailsWrapper>
      <IconRow>
        <IconContainer>
          <UnwrapIcon />
        </IconContainer>
        {transaction.transactionName}
      </IconRow>
      <DateRow>
        <DateDisplay>{formattedDate}</DateDisplay>
        <HourDisplay>{formattedTime}</HourDisplay>
      </DateRow>
    </TransactionDetailsWrapper>
  )
}

export const TransactionsList = () => {
  const { transactions } = useTransactions()

  return (
    <TableWrapper title="Transactions history">
      {transactions.map((transaction) => (
        <Transaction transaction={transaction} key={transaction.transaction.hash} />
      ))}
    </TableWrapper>
  )
}

const notificationContent: { [key in Notification['type']]: { title: string; icon: ReactElement } } = {
  transactionFailed: { title: 'Transaction failed', icon: <ExclamationIcon /> },
  transactionStarted: { title: 'Transaction started', icon: <ClockIcon /> },
  transactionSucceed: { title: 'Transaction succeed', icon: <CheckIcon /> },
  walletConnected: { title: 'Wallet connected', icon: <WalletIcon /> },
}

interface NotificationPanelProps {
  type: Notification['type']
  transaction?: TransactionResponse
}

const NotificationPanel = ({ transaction, type }: NotificationPanelProps) => {
  return (
    <NotificationWrapper>
      <IconContainer>{notificationContent[type].icon}</IconContainer>
      <NotificationDetailsWrapper>
        <TextBold>{notificationContent[type].title}</TextBold>
        {transaction && (
          <Link
            href={getExplorerTransactionLink(transaction.hash, transaction.chainId)}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Etherscan
          </Link>
        )}
      </NotificationDetailsWrapper>
    </NotificationWrapper>
  )
}

interface NotificationItemProps {
  notification: Notification
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  if ('transaction' in notification) {
    return <NotificationPanel type={notification.type} transaction={notification.transaction} />
  } else {
    return <NotificationPanel type={notification.type} />
  }
}

export const NotificationsList = () => {
  const { notifications } = useNotifications()

  return (
    <TableWrapper title="Notifications history">
      {notifications.map((nx) => (
        <NotificationItem key={nx.id} notification={nx} />
      ))}
    </TableWrapper>
  )
}

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  padding: 12px;
`

const TransactionDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
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
  padding: 12px;

  & > * + * {
    margin-top: 12px;
  }
`

const Link = styled.a`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
`

const SmallContentBlock = styled(ContentBlock)`
  padding: 0;
`

const TitleRow = styled(TextBold)`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-bottom: ${Colors.Gray['300']} 1px solid;
  padding: 16px;
  font-size: 18px;
`

const IconRow = styled.div`
  display: flex;
  align-items: center;
`

const DateRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: end;
  padding: 8px;
`

const DateDisplay = styled.div`
  font-size: 14px;
`
const HourDisplay = styled.div`
  font-size: 12px;
  color: ${Colors.Gray['600']};
`
