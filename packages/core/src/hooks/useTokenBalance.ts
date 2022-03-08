import { BigNumber } from '@ethersproject/bignumber'
import { ERC20Interface } from '../constants'
import { Falsy } from '../model/types'
import { useContractCall, QueryParams } from './useContractCall'

export function useTokenBalance(
  tokenAddress: string | Falsy,
  address: string | Falsy,
  queryParams: QueryParams = {}
): BigNumber | undefined {
  const [tokenBalance] =
    useContractCall(
      address &&
        tokenAddress && {
          abi: ERC20Interface,
          address: tokenAddress,
          method: 'balanceOf',
          args: [address],
        },
      queryParams
    ) ?? []
  return tokenBalance
}
