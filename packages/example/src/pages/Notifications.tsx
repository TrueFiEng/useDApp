import { useContractFunction, useEtherBalance, useEthers } from '@usedapp/core'
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

export function Notifications() {
  const { activateBrowserWallet, deactivate, account, library } = useEthers()

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
