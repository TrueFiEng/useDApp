import { BigNumber } from '@ethersproject/bignumber'
import { ERC20Interface } from '../constants'
import { QueryParams } from '../constants/type/QueryParams'
import { Falsy } from '../model/types'
import { useContractCall } from './useContractCall'

/**
 * @public
 */
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
