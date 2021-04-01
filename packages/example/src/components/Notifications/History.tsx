import { getExplorerTransactionLink, Notification } from '@usedapp/core'
import { ChainId, useNotificationsContext, useTransactionsContext } from '@usedapp/core'
import type { ReactNode } from 'react'
import styled from 'styled-components'
import { TextBold } from '../../typography/Text'
import { ContentBlock } from '../base/base'

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

interface TransactionListProps {
  chainId: ChainId
}

export const TransactionsList = ({ chainId }: TransactionListProps) => {
  const { transactions } = useTransactionsContext()
  const chainTransactions = transactions[chainId] ?? []
  const reversed = [...chainTransactions].reverse()

  return (
    <TableWrapper title="Transactions history">
      {reversed.map((tx) => (
        <div key={tx.transaction.hash}>
          {!tx.receipt && <Spinner />}
          <span>{tx.transaction.hash.slice(0, 6) + '...' + tx.transaction.hash.slice(-4)}</span>
        </div>
      ))}
    </TableWrapper>
  )
}

interface NotificationPanelProps {
  title: string
  icon: ReactNode
  transactionHash: string
  chainId: ChainId
}

const NotificationPanel = ({ title, icon, transactionHash, chainId }: NotificationPanelProps) => {
  return (
    <NotificationWrapper>
      <IconContainer>{icon}</IconContainer>
      <NotificationDetailsWrapper>
        <TextBold>{title}</TextBold>
        <Link href={getExplorerTransactionLink(transactionHash, chainId)} target="_blank" rel="noopener noreferrer">
          View on Etherscan
        </Link>
      </NotificationDetailsWrapper>
    </NotificationWrapper>
  )
}

interface NotificationItemProps {
  notification: Notification
  chainId: ChainId
}

const NotificationItem = ({ notification, chainId }: NotificationItemProps) => {
  switch (notification.type) {
    case 'transactionStarted':
      return (
        <NotificationPanel
          title="Transaction started"
          icon={<ClockIcon />}
          transactionHash={notification.transaction.hash}
          chainId={chainId}
        />
      )
    case 'transactionFailed':
      return (
        <NotificationPanel
          title="Transaction failed"
          icon={<ExclamationIcon />}
          transactionHash={notification.transaction.hash}
          chainId={chainId}
        />
      )
    case 'transactionSucceed':
      return (
        <NotificationPanel
          title="Transaction succeed"
          icon={<CheckIcon />}
          transactionHash={notification.transaction.hash}
          chainId={chainId}
        />
      )
    default:
      return null
  }
}
interface NotificationsListProps {
  chainId: ChainId
}

export const NotificationsList = ({ chainId }: NotificationsListProps) => {
  const { notifications } = useNotificationsContext()
  const chainNotifications = notifications[chainId] ?? []
  const reversed = [...chainNotifications].reverse()

  return (
    <TableWrapper title="Notifications history">
      {reversed.map((nx) => (
        <NotificationItem key={JSON.stringify(nx)} notification={nx} chainId={chainId} />
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
