import { Interface } from '@ethersproject/abi'
import { BigNumber } from '@ethersproject/bignumber'
import { Falsy } from '../model/types'
import { useContractCall } from './useContractCall'

const TokenABI = new Interface(['function balanceOf (address) view returns (uint256)'])

export function useTokenBalance(address: string | Falsy, tokenAddress: string | Falsy): BigNumber | undefined {
  const [tokenBalance] = useContractCall(TokenABI, tokenAddress, 'balanceOf', address && [address]) ?? []
  return tokenBalance
}
