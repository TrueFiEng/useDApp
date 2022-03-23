import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from 'ethers'
import { ERC20Interface } from '../constants'
import { QueryParams } from '../constants/type/QueryParams'
import { Falsy } from '../model/types'
import { useCall } from './useCall'

/**
 * @public
 */
export function useTokenBalance(
  tokenAddress: string | Falsy,
  address: string | Falsy,
  queryParams: QueryParams = {}
): BigNumber | undefined {
  const { value: tokenBalance } =
    useCall(
      address &&
        tokenAddress && {
          contract: new Contract(tokenAddress, ERC20Interface),
          method: 'balanceOf',
          args: [address],
        },
      queryParams
    ) ?? {}
  return tokenBalance?.[0]
}
