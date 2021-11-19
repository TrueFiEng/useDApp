import { ERC20Interface } from '../constants'
import { Falsy } from '../model/types'
import { ContractCall, useContractCalls } from './useContractCall'
import { TokenInfo } from '../model/TokenInfo'

export function useToken(tokenAddress: string | Falsy): TokenInfo | undefined {
  const partialCall = {
    abi: ERC20Interface,
    address: tokenAddress || '',
    args: [],
  }
  const args = ['name', 'symbol', 'decimals', 'totalSupply'].map((method): ContractCall => ({ ...partialCall, method }))
  const [name, symbol, decimals, totalSupply] = useContractCalls(args)

  if (!name && !symbol && !decimals && !totalSupply) {
    return undefined
  }

  return {
    name: name?.[0] ?? '',
    symbol: symbol?.[0] ?? '',
    decimals: decimals?.[0],
    totalSupply: totalSupply?.[0],
  }
}
