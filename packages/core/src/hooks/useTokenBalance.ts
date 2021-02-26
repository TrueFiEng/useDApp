import { Interface } from '@ethersproject/abi'
import { useChainCall } from './useChainCalls'

const TokenABI = new Interface(['function balanceOf (address) view returns (uint256)'])

type Address = string | undefined | null

export function useTokenBalance(address: Address, tokenAddress: Address) {
  const balanceOfCall = address && TokenABI.encodeFunctionData('balanceOf', [address])

  const tokenBalance = useChainCall(balanceOfCall && tokenAddress && { address: tokenAddress, data: balanceOfCall })

  return { tokenBalance }
}
