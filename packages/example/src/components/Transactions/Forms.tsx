import React from 'react'
import { BaseContract, Interface, isAddress, parseEther } from 'ethers'
import {
  Goerli,
  Mainnet,
  Optimism,
  OptimismGoerli,
  Rinkeby,
  Ropsten,
  useCall,
  useContractFunction,
  useEtherBalance,
  useEthers,
  useTokenBalance,
} from '@usedapp/core'

import { TransactionForm } from './TransactionForm'

import { Weth10 } from '../../../gen/types/Weth10'
import WethAbi from '../../abi/Weth10.json'

const wethInterface = new Interface(WethAbi.abi)

// using weth9 addresses due to bigger usage
const wethContractAddresses = {
  [Mainnet.chainId]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  [Rinkeby.chainId]: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  [Goerli.chainId]: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
  [Ropsten.chainId]: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  [Optimism.chainId]: '0x4200000000000000000000000000000000000006',
  [OptimismGoerli.chainId]: '0x09bADef78f92F20fd5f7a402dbb1d25d4901aAb2',
}

export const DepositEth = () => {
  const { account, chainId } = useEthers()
  const etherBalance = useEtherBalance(account)
  const wethContractAddress = chainId ? wethContractAddresses[chainId] : undefined

  const contract = isAddress(wethContractAddress) && (new BaseContract(wethContractAddress, wethInterface) as Weth10)

  const { state, send } = useContractFunction(contract, 'deposit', { transactionName: 'Wrap' })

  const depositEther = (etherAmount: string) => {
    void send({ value: parseEther(etherAmount) })
  }

  return (
    <TransactionForm balance={etherBalance} send={depositEther} title="Wrap Ether" ticker="ETH" transaction={state} />
  )
}

export const WithdrawEth = () => {
  const { account, chainId } = useEthers()
  const wethContractAddress = chainId ? wethContractAddresses[chainId] : undefined
  const wethBalance = useTokenBalance(wethContractAddress, account)
  const contract = wethContractAddress && (new BaseContract(wethContractAddress, wethInterface) as Weth10)
  const { state, send } = useContractFunction(contract, 'withdraw', { transactionName: 'Unwrap' })

  const withdrawEther = (wethAmount: string) => {
    void send(parseEther(wethAmount))
  }

  return (
    <TransactionForm
      balance={wethBalance !== undefined ? BigInt(wethBalance) : BigInt('0')}
      send={withdrawEther}
      title="Unwrap Ether"
      ticker="WETH"
      transaction={state}
    />
  )
}
