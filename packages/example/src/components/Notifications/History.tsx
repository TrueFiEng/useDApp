import type { TransactionResponse } from '@ethersproject/providers'
import {
  getExplorerTransactionLink,
  Notification,
  shortenTransactionHash,
  useNotifications,
  useTransactions,
} from '@usedapp/core'
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

function notificationIcon(type: Notification['type']) {
  switch (type) {
    case 'transactionStarted':
      return <ClockIcon />
    case 'transactionFailed':
      return <ExclamationIcon />
    case 'transactionSucceed':
      return <CheckIcon />
    default:
      return null
  }
}

const notificationTitle: { [key in Notification['type']]: string } = {
  transactionFailed: 'Transaction failed',
  transactionStarted: 'Transaction started',
  transactionSucceed: 'Transaction succeed',
  walletConnected: 'Wallet connected',
}

interface NotificationPanelProps {
  type: Notification['type']
  transaction: TransactionResponse
}

const NotificationPanel = ({ transaction, type }: NotificationPanelProps) => {
  return (
    <NotificationWrapper>
      <IconContainer>{notificationIcon(type)}</IconContainer>
      <NotificationDetailsWrapper>
        <TextBold>{notificationTitle[type]}</TextBold>
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
  if ('transaction' in notification) {
    return <NotificationPanel type={notification.type} transaction={notification.transaction} />
  } else {
    return null
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
