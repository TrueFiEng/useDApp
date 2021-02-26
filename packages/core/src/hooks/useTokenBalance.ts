import { Interface } from '@ethersproject/abi'
import { BigNumber } from '@ethersproject/bignumber'
import { ERC20ABI } from '../constants'
import { Falsy } from '../model/types'
import { useContractCall } from './useContractCall'

export function useTokenBalance(address: string | Falsy, tokenAddress: string | Falsy): BigNumber | undefined {
  const [tokenBalance] = useContractCall(ERC20ABI, tokenAddress, 'balanceOf', address && [address]) ?? []
  return tokenBalance
}
