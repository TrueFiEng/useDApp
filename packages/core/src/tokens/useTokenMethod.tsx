import { useContractFunction } from '../hooks'
import { ERC20Interface } from '../constants'
import { Contract } from '@ethersproject/contracts'
import { BigNumber } from 'ethers'
import { useEffect } from 'react'

export const useTokenMethod = (method: string, tokenAddress: string, ...args: any[]) => {
  const contract = new Contract(tokenAddress, ERC20Interface)
  return useContractFunction(contract, method, { transactionName: method })
}

// export const useTokenApprove = async (tokenAddress: string, spender: string, amount: BigNumber) => {
//   return useTokenMethod('approve', tokenAddress, spender, amount)
// }

// export const useTokenTransfer = async (tokenAddress: string, to: string, amount: BigNumber) => {
//   return useTokenMethod('transfer', tokenAddress, to, amount)
// }

// export const useTokenTransferFrom = async (tokenAddress: string, from: string, to: string, amount: BigNumber) => {
//   return useTokenMethod('transferFrom', tokenAddress, from, to, amount)
// }
