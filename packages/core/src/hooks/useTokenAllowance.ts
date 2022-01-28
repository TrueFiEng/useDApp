import { BigNumber } from '@ethersproject/bignumber'
import { ChainId, ERC20Interface } from '../constants'
import { Falsy } from '../model/types'
import { useContractCall } from './useContractCall'

export function useTokenAllowance(
  tokenAddress: string | Falsy,
  ownerAddress: string | Falsy,
  spenderAddress: string | Falsy,
  chainId?: ChainId
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
      chainId
    ) ?? []
  return allowance
}
