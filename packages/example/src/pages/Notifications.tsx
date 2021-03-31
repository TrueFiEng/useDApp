import {
  ChainId,
  shortenAddress,
  useContractFunction,
  useEtherBalance,
  useEthers,
  useNotificationsContext,
  useTransactionsContext,
} from '@usedapp/core'
import { Container, ContentBlock, ContentRow, MainContent, Section, SectionRow } from '../components/base/base'
import { Button } from '../components/base/Button'
import { formatEther } from '@ethersproject/units'
import { Contract } from '@ethersproject/contracts'
import type { Web3Provider } from '@ethersproject/providers'
import styled from 'styled-components'
import { utils } from 'ethers'

import { Title } from '../typography/Title'
import { useEffect, useState } from 'react'

const abi = ['function deposit() external payable']
const wethInterface = new utils.Interface(abi)

interface DepositEthProps {
  account: string
  library: Web3Provider
}

const DepositEth = ({ account, library }: DepositEthProps) => {
  const etherBalance = useEtherBalance(account)
  const contract = new Contract('0xA243FEB70BaCF6cD77431269e68135cf470051b4', wethInterface, library.getSigner())
  const { send, state } = useContractFunction(contract, 'deposit')
  const [etherValue, setEtherValue] = useState('0')

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <ContentBlock>
      <ContentRow>Deposit ether:</ContentRow>
      {etherBalance && <ContentRow>Your ether balance: {formatEther(etherBalance)}</ContentRow>}
      <ContentRow>
        <label>How much?</label>
        <Input type="number" step="0.01" value={etherValue} onChange={(e) => setEtherValue(e.currentTarget.value)} />
      </ContentRow>
      <ContentRow>
        <SmallButton
          onClick={() => {
            send({ value: utils.parseEther(etherValue) })
            setEtherValue('0')
          }}
        >
          Send
        </SmallButton>
      </ContentRow>
    </ContentBlock>
  )
}

interface TransactionListProps {
  chainId: ChainId
}

const TransactionsList = ({ chainId }: TransactionListProps) => {
  const { transactions } = useTransactionsContext()
  const chainTransactions = transactions[chainId] ?? []

  return (
    <ContentBlock>
      <ContentRow>Transactions history</ContentRow>
      {chainTransactions.map((tx) => (
        <ContentRow key={tx.transaction.hash}>
          {!tx.receipt && <Spinner />}
          <span>{tx.transaction.hash}</span>
        </ContentRow>
      ))}
    </ContentBlock>
  )
}
interface NotificationsListProps {
  chainId: ChainId
}

const NotificationsList = ({ chainId }: NotificationsListProps) => {
  const { notifications } = useNotificationsContext()
  const chainNotifications = notifications[chainId] ?? []

  return (
    <ContentBlock>
      <ContentRow>Notifications history</ContentRow>
      {chainNotifications.map((nx) => (
        <ContentRow key={JSON.stringify(nx)}>{nx.type}</ContentRow>
      ))}
    </ContentBlock>
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
          {account && library && <DepositEth account={account} library={library} />}
          {account && chainId && <TransactionsList chainId={chainId} />}
          {account && chainId && <NotificationsList chainId={chainId} />}
        </Section>
      </Container>
    </MainContent>
  )
}

const SmallButton = styled(Button)`
  min-width: unset;
  height: unset;
  padding: 5px 20px;
`

const Input = styled.input`
  margin-left: 10px;
  padding: 4px;
`

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
