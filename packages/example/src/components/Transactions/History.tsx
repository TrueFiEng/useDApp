import type { TransactionResponse } from '@ethersproject/providers'
import {
  getExplorerTransactionLink,
  Notification,
  useNotifications,
  useTransactions,
  getStoredTransactionState,
  StoredTransaction,
} from '@usedapp/core'
import React, { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'
import { TextBold } from '../../typography/Text'
import { ContentBlock } from '../base/base'
import {
  CheckIcon,
  ClockIcon,
  ExclamationIcon,
  ShareIcon,
  UnwrapIcon,
  WalletIcon,
  WrapIcon,
  SpinnerIcon,
} from './Icons'
import { Colors } from '../../global/styles'
import { AnimatePresence, motion } from 'framer-motion'

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

interface DateProps {
  date: number
  className?: string
}

const DateCell = ({ date, className }: DateProps) => {
  const dateObject = new Date(date)
  const formattedDate = dateObject.toLocaleDateString()
  const formattedTime = dateObject.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })

  return (
    <DateRow className={className}>
      <DateDisplay>{formattedDate}</DateDisplay>
      <HourDisplay>{formattedTime}</HourDisplay>
    </DateRow>
  )
}

interface TransactionLinkProps {
  transaction: TransactionResponse | undefined
}

const TransactionLink = ({ transaction }: TransactionLinkProps) => (
  <>
    {transaction && (
      <Link
        href={getExplorerTransactionLink(transaction.hash, transaction.chainId)}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on Etherscan
        <LinkIconWrapper>
          <ShareIcon />
        </LinkIconWrapper>
      </Link>
    )}
  </>
)

const notificationContent: { [key in Notification['type']]: { title: string; icon: ReactElement } } = {
  transactionFailed: { title: 'Transaction failed', icon: <ExclamationIcon /> },
  transactionStarted: { title: 'Transaction started', icon: <ClockIcon /> },
  transactionSucceed: { title: 'Transaction succeed', icon: <CheckIcon /> },
  walletConnected: { title: 'Wallet connected', icon: <WalletIcon /> },
}

interface ListElementProps {
  icon: ReactElement
  title: string | undefined
  transaction?: TransactionResponse
}

const ListElement = ({ transaction, icon, title }: ListElementProps) => {
  const notificationDate = Date.now()

  return (
    <NotificationWrapper layout initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <NotificationIconContainer>{icon}</NotificationIconContainer>
      <NotificationDetailsWrapper>
        <TextBold>{title}</TextBold>
        <TransactionLink transaction={transaction} />
      </NotificationDetailsWrapper>
      <NotificationDate date={notificationDate} />
    </NotificationWrapper>
  )
}

function TransactionIcon(transaction: StoredTransaction) {
  if (getStoredTransactionState(transaction) === 'Mining') {
    return <SpinnerIcon />
  } else if (getStoredTransactionState(transaction) === 'Fail') {
    return <ExclamationIcon />
  } else if (transaction.transactionName === 'Unwrap') {
    return <UnwrapIcon />
  } else return <WrapIcon />
}

export const TransactionsList = () => {
  const { transactions } = useTransactions()
  return (
    <TableWrapper title="Transactions history">
      <AnimatePresence initial={false}>
        {transactions.map((transaction) => (
          <ListElement
            transaction={transaction.transaction}
            title={transaction.transactionName}
            icon={TransactionIcon(transaction)}
            key={transaction.transaction.hash}
          />
        ))}
      </AnimatePresence>
    </TableWrapper>
  )
}

export const NotificationsList = () => {
  const { notifications } = useNotifications()
  return (
    <TableWrapper title="Notifications history">
      <AnimatePresence initial={false}>
        {notifications.map((notification) => {
          if ('transaction' in notification)
            return (
              <ListElement
                key={notification.id}
                icon={notificationContent[notification.type].icon}
                title={notificationContent[notification.type].title}
                transaction={notification.transaction}
              />
            )
          else
            return (
              <ListElement
                key={notification.id}
                icon={notificationContent[notification.type].icon}
                title={notificationContent[notification.type].title}
              />
            )
        })}
      </AnimatePresence>
    </TableWrapper>
  )
}

const NotificationIconContainer = styled.div`
  width: 48px;
  height: 48px;
  padding: 12px;
  padding: 14px 16px 14px 12px;
`

const NotificationWrapper = styled(motion.div)`
  display: flex;
  justify-content: space-between;
`

const NotificationDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 4px 0;
`

const Table = styled.div`
  height: 300px;
  overflow: scroll;
  padding: 12px;

  & > * + * {
    margin-top: 12px;
  }
`

const LinkIconWrapper = styled.div`
  width: 12px;
  height: 12px;
  margin-left: 8px;
`

const Link = styled.a`
  display: flex;
  font-size: 12px;
  text-decoration: underline;
  color: ${Colors.Gray['600']};
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

const DateRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: end;
  padding: 8px;
`

const NotificationDate = styled(DateCell)`
  margin-left: auto;
`

const DateDisplay = styled.div`
  font-size: 14px;
`
const HourDisplay = styled.div`
  font-size: 12px;
  color: ${Colors.Gray['600']};
`
