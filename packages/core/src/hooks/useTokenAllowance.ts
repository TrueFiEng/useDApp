import { BigNumber } from '@ethersproject/bignumber'
import { ERC20Interface } from '../constants'
import { Falsy } from '../model/types'
import { useContractCall } from './useContractCall'

export function useTokenAllowance(
  ownerAddress: string | Falsy,
  spenderAddress: string | Falsy,
  tokenAddress: string | Falsy
): BigNumber | undefined {
  const [tokenBalance] =
    useContractCall(
      ownerAddress &&
        spenderAddress &&
        tokenAddress && {
          abi: ERC20Interface,
          address: tokenAddress,
          method: 'allowance',
          args: [ownerAddress, spenderAddress],
        }
    ) ?? []
  return tokenBalance
}
