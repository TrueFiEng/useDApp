import { BigNumber } from '@ethersproject/bignumber'
import { ERC20Interface } from '../constants'
import { QueryParams } from '../constants/type/QueryParams'
import { Falsy } from '../model/types'
import { useContractCall } from './useContractCall'

/**
 * @public
 */
export function useTokenAllowance(
  tokenAddress: string | Falsy,
  ownerAddress: string | Falsy,
  spenderAddress: string | Falsy,
  queryParams: QueryParams = {}
): BigNumber | undefined {
  const [allowance] =
    useContractCall(
      ownerAddress &&
        spenderAddress &&
        tokenAddress && {
          abi: ERC20Interface,
          address: tokenAddress,
          method: 'allowance',
          args: [ownerAddress, spenderAddress],
        },
      queryParams
    ) ?? []
  return allowance
}
