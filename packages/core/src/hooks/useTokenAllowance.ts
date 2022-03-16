import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from 'ethers'
import { ERC20Interface } from '../constants'
import { QueryParams } from '../constants/type/QueryParams'
import { Falsy } from '../model/types'
import { useCall } from './useCall'

/**
 * @public
 */
export function useTokenAllowance(
  tokenAddress: string | Falsy,
  ownerAddress: string | Falsy,
  spenderAddress: string | Falsy,
  queryParams: QueryParams = {}
): BigNumber | undefined {
  const { value: allowance } =
    useCall(
      ownerAddress &&
        spenderAddress &&
        tokenAddress && {
          contract: new Contract(tokenAddress, ERC20Interface),
          method: 'allowance',
          args: [ownerAddress, spenderAddress],
        },
      queryParams
    ) ?? {}
  return allowance?.[0]
}
