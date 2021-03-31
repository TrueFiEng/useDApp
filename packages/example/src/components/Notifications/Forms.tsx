import type { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import type { Web3Provider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'
import { useContractCall, useContractFunction, useEtherBalance } from '@usedapp/core'
import { utils } from 'ethers'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TextBold } from '../../typography/Text'
import { ContentBlock, ContentRow } from '../base/base'
import { Button } from '../base/Button'

const abi = [
  'function deposit() external payable',
  'function balanceOf(address account) external view returns (uint256)',
  'function withdraw(uint256 value) external',
]
const wethInterface = new utils.Interface(abi)

interface TransferFormProps {
  balance: BigNumber | undefined
  send: (value: BigNumber) => void
  title: string
  ticker: string
}

const TransferForm = ({ balance, send, title, ticker }: TransferFormProps) => {
  const [value, setValue] = useState('0')
  return (
    <ContentBlock>
      <CellTitle>{title}</CellTitle>
      {balance && (
        <ContentRow>
          Your {ticker} balance: {formatEther(balance)}
        </ContentRow>
      )}
      <ContentRow>
        <label>How much?</label>
        <Input type="number" step="0.01" value={value} onChange={(e) => setValue(e.currentTarget.value)} />
      </ContentRow>
      <ContentRow>
        <SmallButton
          onClick={() => {
            send(utils.parseEther(value))
            setValue('0')
          }}
        >
          Send
        </SmallButton>
      </ContentRow>
    </ContentBlock>
  )
}

interface DepositEthProps {
  account: string
  library: Web3Provider
}

export const DepositEth = ({ account, library }: DepositEthProps) => {
  const etherBalance = useEtherBalance(account)
  const contract = new Contract('0xA243FEB70BaCF6cD77431269e68135cf470051b4', wethInterface, library.getSigner())
  const { send, state } = useContractFunction(contract, 'deposit')

  useEffect(() => {
    console.log({ ethState: state })
  }, [state])

  return (
    <TransferForm
      balance={etherBalance}
      send={(value: BigNumber) => send({ value })}
      title="Deposit ether"
      ticker="ETH"
    />
  )
}

export const WithdrawEth = ({ account, library }: DepositEthProps) => {
  const wethBalance = useContractCall({
    abi: wethInterface,
    address: '0xA243FEB70BaCF6cD77431269e68135cf470051b4',
    method: 'balanceOf',
    args: [account],
  })
  const contract = new Contract('0xA243FEB70BaCF6cD77431269e68135cf470051b4', wethInterface, library.getSigner())
  const { send, state } = useContractFunction(contract, 'withdraw')

  useEffect(() => {
    console.log({ wethState: state })
  }, [state])

  return (
    <TransferForm
      balance={wethBalance?.[0]}
      send={(value: BigNumber) => send(value)}
      title="Withdraw ether"
      ticker="WETH"
    />
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

const CellTitle = styled(TextBold)`
  font-size: 20px;
  margin-bottom: 10px;
`
