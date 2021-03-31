import { ChainId, useEthers, useNotificationsContext, useTransactionsContext } from '@usedapp/core'
import type { Notification } from '@usedapp/core'
import type { ReactNode } from 'react'
import { DepositEth, WithdrawEth } from '../components/Notifications/Forms'
import styled from 'styled-components'
import { Container, ContentBlock, MainContent, Section, SectionRow } from '../components/base/base'
import { Button } from '../components/base/Button'
import { TextBold } from '../typography/Text'
import { Title } from '../typography/Title'

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

const TransactionsList = ({ chainId }: TransactionListProps) => {
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
}

const NotificationPanel = ({ title, icon, transactionHash }: NotificationPanelProps) => {
  function getEtherscanLink(hash: string) {
    return `https://kovan.etherscan.io/tx/${hash}`
  }
  return (
    <NotificationWrapper>
      <IconContainer>{icon}</IconContainer>
      <NotificationDetailsWrapper>
        <TextBold>{title}</TextBold>
        <Link href={getEtherscanLink(transactionHash)} target="_blank" rel="noopener noreferrer">
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
        <NotificationPanel
          title="Transaction started"
          icon={<ClockIcon />}
          transactionHash={notification.transaction.hash}
        />
      )
    case 'transactionFailed':
      return (
        <NotificationPanel
          title="Transaction failed"
          icon={<ExclamationIcon />}
          transactionHash={notification.transaction.hash}
        />
      )
    case 'transactionSucceed':
      return (
        <NotificationPanel
          title="Transaction succeed"
          icon={<CheckIcon />}
          transactionHash={notification.transaction.hash}
        />
      )
    default:
      return null
  }
}
interface NotificationsListProps {
  chainId: ChainId
}

const NotificationsList = ({ chainId }: NotificationsListProps) => {
  const { notifications } = useNotificationsContext()
  const chainNotifications = notifications[chainId] ?? []
  const reversed = [...chainNotifications].reverse()

  return (
    <TableWrapper title="Notifications history">
      {reversed.map((nx) => (
        <NotificationItem key={JSON.stringify(nx)} notification={nx} />
      ))}
    </TableWrapper>
  )
}

export function Notifications() {
  const { activateBrowserWallet, deactivate, account, library, chainId } = useEthers()

  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>Notifications</Title>
            {account && <Button onClick={deactivate}>Disconnect</Button>}
            {!account && <Button onClick={activateBrowserWallet}>Connect</Button>}
          </SectionRow>
          <TableGrid>
            {account && library && <DepositEth account={account} library={library} />}
            {account && library && <WithdrawEth account={account} library={library} />}
            {account && chainId && <TransactionsList chainId={chainId} />}
            {account && chainId && <NotificationsList chainId={chainId} />}
          </TableGrid>
        </Section>
      </Container>
    </MainContent>
  )
}

const Spinner = styled.div`
  position: relative;
  display: inline-block;
  bottom: -0.1em;
  height: 1em;
  width: 1em;
  border-radius: 50%;
  border: 0.15em solid;
  margin-right: 10px;
  border-color: currentColor currentColor currentColor transparent;
  animation: spinner-spin 1s infinite linear;

  @keyframes spinner-spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const ExclamationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
)

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
const TableGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
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
