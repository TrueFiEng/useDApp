import { Contract } from '@ethersproject/contracts'
import { utils } from 'ethers'
import React from 'react'
import { useContractFunction, useEtherBalance, useEthers, useTokenBalance } from '@usedapp/core'

import { TransactionForm } from './TransactionForm'

import WethAbi from '../../abi/Weth10.json'

const wethInterface = new utils.Interface(WethAbi)
const wethContractAddress = '0xA243FEB70BaCF6cD77431269e68135cf470051b4'
const contract = new Contract(wethContractAddress, wethInterface)

export const DepositEth = () => {
  const { account } = useEthers()
  const etherBalance = useEtherBalance(account)

  const { state, send } = useContractFunction(contract, 'deposit', { transactionName: 'Wrap' })

  const depositEther = (etherAmount: string) => {
    send({ value: utils.parseEther(etherAmount) })
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
    send(utils.parseEther(wethAmount))
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
