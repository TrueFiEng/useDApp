import { ERC20Interface } from '../constants'
import { Falsy } from '../model/types'
import { TokenInfo } from '../model/TokenInfo'
import { Call, useCalls } from './useCall'
import { Contract } from 'ethers'

/**
 * @public
 */
export function useToken(tokenAddress: string | Falsy): TokenInfo | undefined {
  const partialCall = tokenAddress && {
    contract: new Contract(tokenAddress, ERC20Interface),
    address: tokenAddress,
    args: [],
  }
  const args = ['name', 'symbol', 'decimals', 'totalSupply'].map(
    (method): Call | Falsy => partialCall && { ...partialCall, method }
  )
  const [name, symbol, decimals, totalSupply] = useCalls(args)

  if (!name && !symbol && !decimals && !totalSupply) {
    return undefined
  }

  return {
    name: name?.value[0] ?? '',
    symbol: symbol?.value[0] ?? '',
    decimals: decimals?.value[0],
    totalSupply: totalSupply?.value[0],
  }
}
