import type { TransactionResponse } from '@ethersproject/providers'
import {
  getExplorerTransactionLink,
  Notification,
  shortenTransactionHash,
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

  return (
    <TableWrapper title="Transactions history">
      {transactions.map((tx) => (
        <TransactionDetailsWrapper key={tx.transaction.hash}>
          {!tx.receipt && (
            <IconContainer>
              <SpinnerIcon />
            </IconContainer>
          )}
          <div>{shortenTransactionHash(tx.transaction.hash)}</div>
        </TransactionDetailsWrapper>
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
