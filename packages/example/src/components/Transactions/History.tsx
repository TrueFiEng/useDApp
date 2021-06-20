import type { TransactionResponse } from '@ethersproject/providers'
import {
  getExplorerTransactionLink,
  Notification,
  useNotifications,
  useTransactions,
  getStoredTransactionState,
  StoredTransaction,
  shortenTransactionHash,
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
import { Colors, Shadows } from '../../global/styles'
import { AnimatePresence, motion } from 'framer-motion'
import { formatEther } from '@ethersproject/units'
import { BigNumber } from 'ethers'
import { Link } from '../base/Link'

interface TableWrapperProps {
  children: ReactNode
  title: string
}

const formatter = new Intl.NumberFormat('en-us', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
})

const formatBalance = (balance: BigNumber | undefined) =>
  formatter.format(parseFloat(formatEther(balance ?? BigNumber.from('0'))))

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
  date: number
}

const ListElement = ({ transaction, icon, title, date }: ListElementProps) => {
  return (
    <ListElementWrapper layout initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <ListIconContainer>{icon}</ListIconContainer>
      <ListDetailsWrapper>
        <TextBold>{title}</TextBold>
        <TransactionLink transaction={transaction} />
      </ListDetailsWrapper>
      <NotificationDate date={date} />
    </ListElementWrapper>
  )
}

function TransactionIcon(transaction: StoredTransaction) {
  if (getStoredTransactionState(transaction) === 'Mining') {
    return <SpinnerIcon />
  } else if (getStoredTransactionState(transaction) === 'Fail') {
    return <ExclamationIcon />
  } else if (transaction.transactionName === 'Unwrap') {
    return <UnwrapIcon />
  } else if (transaction.transactionName === 'Wrap') {
    return <WrapIcon />
  } else {
    return <CheckIcon />
  }
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
            date={transaction.submittedAt}
          />
        ))}
      </AnimatePresence>
    </TableWrapper>
  )
}

const NotificationElement = ({ transaction, icon, title }: ListElementProps) => {
  return (
    <NotificationWrapper layout initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <NotificationIconContainer>{icon}</NotificationIconContainer>
      <NotificationDetailsWrapper>
        <NotificationText>{title}</NotificationText>
        <TransactionLink transaction={transaction} />
        <TransactionDetails>
          {transaction && `${shortenTransactionHash(transaction?.hash)} #${transaction.nonce}`}
        </TransactionDetails>
      </NotificationDetailsWrapper>
      {transaction && <div style={{ marginLeft: 'auto' }}>- {formatBalance(transaction.value)} ETH</div>}
    </NotificationWrapper>
  )
}

export const NotificationsList = () => {
  const { notifications } = useNotifications()
  return (
    <NotificationsWrapper>
      <AnimatePresence initial={false}>
        {notifications.map((notification) => {
          if ('transaction' in notification)
            return (
              <NotificationElement
                key={notification.id}
                icon={notificationContent[notification.type].icon}
                title={notificationContent[notification.type].title}
                transaction={notification.transaction}
                date={Date.now()}
              />
            )
          else
            return (
              <NotificationElement
                key={notification.id}
                icon={notificationContent[notification.type].icon}
                title={notificationContent[notification.type].title}
                date={Date.now()}
              />
            )
        })}
      </AnimatePresence>
    </NotificationsWrapper>
  )
}

const NotificationText = styled(TextBold)`
  font-size: 20px;
  margin-bottom: 5px;
`

const TransactionDetails = styled.div`
  font-size: 14px;
`

const NotificationWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  background-color: ${Colors.White};
  box-shadow: ${Shadows.notification};
  width: 395px;
  border-radius: 10px;
  margin: 15px;
  padding: 10px 20px 10px 20px;
`

const NotificationsWrapper = styled.div`
  position: fixed;
  right: 24px;
  bottom: 24px;
`

const NotificationIconContainer = styled.div`
  width: 60px;
  height: 60px;
  padding: 0px;
  margin-right: 20px;
`

const ListIconContainer = styled.div`
  width: 48px;
  height: 48px;
  padding: 12px;
  padding: 14px 16px 14px 12px;
`

const ListElementWrapper = styled(motion.div)`
  display: flex;
  justify-content: space-between;
`

const NotificationDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 0;
`

const ListDetailsWrapper = styled.div`
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
