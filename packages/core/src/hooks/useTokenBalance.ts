import { BigNumber } from '@ethersproject/bignumber'
import { ChainId, ERC20Interface } from '../constants'
import { Falsy } from '../model/types'
import { useContractCall } from './useContractCall'

export function useTokenBalance(
  tokenAddress: string | Falsy,
  address: string | Falsy,
  chainId?: ChainId
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
      chainId
    ) ?? []
  return tokenBalance
}
