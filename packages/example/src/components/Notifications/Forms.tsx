import { Contract } from '@ethersproject/contracts'
import { formatEther } from '@ethersproject/units'
import { TransactionStatus, useContractCall, useContractFunction, useEtherBalance, useEthers } from '@usedapp/core'
import { utils } from 'ethers'
import React, { useState } from 'react'
import styled from 'styled-components'
import { TextBold } from '../../typography/Text'
import { ContentBlock } from '../base/base'
import { Button } from '../base/Button'
import WethAbi from '../../abi/Weth10.json'
import { BorderRad, Colors } from '../../global/styles'
import { BigNumber } from 'ethers'
import { SpinnerIcon } from './Icons'

const wethInterface = new utils.Interface(WethAbi)

interface TitleProps {
  balance: BigNumber | undefined
  title: string
  ticker: string
}

const Title = ({ balance, title, ticker }: TitleProps) => {
  const formatter = new Intl.NumberFormat('en-us', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  })
  const formattedBalance = formatter.format(parseFloat(formatEther(balance ?? BigNumber.from('0'))))

  return (
    <TitleRow>
      <CellTitle>{title}</CellTitle>
      <BalanceWrapper>
        Your {ticker} balance: {formattedBalance}
      </BalanceWrapper>
    </TitleRow>
  )
}

interface InputComponentProps {
  send: (value: BigNumber) => void
  ticker: string
  transactionStatus: TransactionStatus['status']
}

const InputComponent = ({ ticker, transactionStatus, send }: InputComponentProps) => {
  const { account } = useEthers()
  const [value, setValue] = useState('0')
  const isMining = transactionStatus === 'Mining'
  const buttonContent = isMining ? (
    <IconContainer>
      <SpinnerIcon />
    </IconContainer>
  ) : (
    'Send'
  )
  const onClick = () => {
    send(utils.parseEther(value))
    setValue('0')
  }

  return (
    <InputRow>
      <Input
        id={`${ticker}Input`}
        type="number"
        step="0.01"
        min="0"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <FormTicker>{ticker}</FormTicker>
      <SmallButton disabled={!account || isMining} onClick={onClick}>
        {buttonContent}
      </SmallButton>
    </InputRow>
  )
}

interface ErrorRowProps {
  transaction: TransactionStatus
}

const ErrorMessage = ({ transaction }: ErrorRowProps) => {
  return <ErrorRow>{'errorMessage' in transaction && transaction.errorMessage}</ErrorRow>
}

interface TransactionFormProps {
  balance: BigNumber | undefined
  send: (value: BigNumber) => void
  title: string
  ticker: string
  transaction: TransactionStatus
}

const TransactionForm = ({ balance, send, title, ticker, transaction }: TransactionFormProps) => {
  return (
    <SmallContentBlock>
      <Title title={title} balance={balance} ticker={ticker} />
      <LabelRow>
        <Label htmlFor={`${ticker}Input`}>How much?</Label>
      </LabelRow>
      <InputComponent ticker={ticker} transactionStatus={transaction.status} send={send} />
      <ErrorMessage transaction={transaction} />
    </SmallContentBlock>
  )
}

export const DepositEth = () => {
  const { account, library } = useEthers()
  const etherBalance = useEtherBalance(account)
  const contract = new Contract('0xA243FEB70BaCF6cD77431269e68135cf470051b4', wethInterface, library?.getSigner())
  const { state, send } = useContractFunction(contract, 'deposit', { transactionName: 'Wrap' })

  return (
    <TransactionForm
      balance={etherBalance}
      send={(value: BigNumber) => send({ value })}
      title="Wrap Ether"
      ticker="ETH"
      transaction={state}
    />
  )
}

export const WithdrawEth = () => {
  const { account, library } = useEthers()
  const wethContractAddress = '0xA243FEB70BaCF6cD77431269e68135cf470051b4'
  const wethBalance = useContractCall(
    account && {
      abi: wethInterface,
      address: wethContractAddress,
      method: 'balanceOf',
      args: [account],
    }
  )
  const contract = new Contract(wethContractAddress, wethInterface, library?.getSigner())
  const { state, send } = useContractFunction(contract, 'withdraw', { transactionName: 'Unwrap' })

  return (
    <TransactionForm
      balance={wethBalance?.[0]}
      send={(value: BigNumber) => send(value)}
      title="Unwrap Ether"
      ticker="WETH"
      transaction={state}
    />
  )
}

const SmallButton = styled(Button)`
  display: flex;
  justify-content: center;
  min-width: 95px;
  height: unset;
  padding: 8px 24px;

  &:disabled {
    color: ${Colors.Gray['600']};
    cursor: unset;
  }

  &:disabled:hover,
  &:disabled:focus {
    background-color: unset;
    color: unset;
  }
`

const Input = styled.input`
  height: 100%;
  width: 120px;
  padding: 0 0 0 24px;
  border: 0;
  border-radius: ${BorderRad.m};
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline: transparent auto 1px;
  }

  &:focus-visible {
    box-shadow: inset 0 0 0 2px ${Colors.Black['900']};
  }
`

const CellTitle = styled(TextBold)`
  font-size: 18px;
`

const InputRow = styled.div`
  display: flex;
  margin: 0 auto;
  color: ${Colors.Gray['600']};
  align-items: center;
  border: ${Colors.Gray['300']} 1px solid;
  border-radius: ${BorderRad.m};
  overflow: hidden;
`

const FormTicker = styled.div`
  padding: 0 16px;
`

const LabelRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 32px 0 24px 0;
`

const Label = styled.label`
  font-weight: 700;
`

const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-bottom: ${Colors.Gray['300']} 1px solid;
  padding: 16px;
`

const BalanceWrapper = styled.div`
  color: ${Colors.Gray['600']};
  font-size: 14px;
`

const SmallContentBlock = styled(ContentBlock)`
  padding: 0;
`

const IconContainer = styled.div`
  height: 24px;
  width: 24px;
`

const ErrorRow = styled.div`
  height: 16px;
  font-size: 14px;
  margin: 8px auto 32px auto;
  color: ${Colors.Red['400']};
`
