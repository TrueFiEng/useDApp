import { BigNumber } from '@ethersproject/bignumber'
import { ERC20Interface } from '../constants'
import { Falsy } from '../model/types'
import { useContractCall } from './useContractCall'

export function useTokenBalance(address: string | Falsy, tokenAddress: string | Falsy): BigNumber | undefined {
  const [tokenBalance] = useContractCall(ERC20Interface, tokenAddress, 'balanceOf', address && [address]) ?? []
  return tokenBalance
}
