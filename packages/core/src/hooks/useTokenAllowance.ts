import { BigNumber } from '@ethersproject/bignumber'
import { ERC20Interface } from '../constants'
import { Falsy } from '../model/types'
import { useContractCall, QueryParams } from './useContractCall'

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
