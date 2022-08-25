import React from 'react'
import { utils, Contract } from 'ethers'
import { useContractFunction, useEtherBalance, useEthers, useTokenBalance } from '@usedapp/core'

import { TransactionForm } from './TransactionForm'

import { Weth10 } from '../../../gen/types/Weth10'
import WethAbi from '../../abi/Weth10.json'

const wethInterface = new utils.Interface(WethAbi.abi)
const wethContractAddress = '0xA243FEB70BaCF6cD77431269e68135cf470051b4'
const contract = new Contract(wethContractAddress, wethInterface) as Weth10

export const DepositEth = () => {
  const { account } = useEthers()
  const etherBalance = useEtherBalance(account)

  const { state, send } = useContractFunction(contract, 'deposit', { transactionName: 'Wrap' })

  const depositEther = (etherAmount: string) => {
    void send({ value: utils.parseEther(etherAmount) })
  }

  return (
    <TransactionForm balance={etherBalance} send={depositEther} title="Wrap Ether" ticker="ETH" transaction={state} />
  )
}

export const WithdrawEth = () => {
  const { account } = useEthers()
  const wethBalance = useTokenBalance(wethContractAddress, account)

  const { state, send } = useContractFunction(contract, 'withdraw', { transactionName: 'Unwrap' })

  const withdrawEther = (wethAmount: string) => {
    void send(utils.parseEther(wethAmount))
  }

  return (
    <TransactionForm
      balance={wethBalance}
      send={withdrawEther}
      title="Unwrap Ether"
      ticker="WETH"
      transaction={state}
    />
  )
}
