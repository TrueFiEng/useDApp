import { ERC20Interface } from '../constants'
import { Falsy } from '../model/types'
import { TokenInfo } from '../model/TokenInfo'
import { Call, useCalls } from './useCall'
import { Contract } from 'ethers'

/**
 * @public
 */
export function useToken(tokenAddress: string | Falsy): TokenInfo | undefined {
  const partialCall = {
    contract: new Contract(tokenAddress || '', ERC20Interface),
    address: tokenAddress || '',
    args: [],
  }
  const args = ['name', 'symbol', 'decimals', 'totalSupply'].map((method): Call => ({ ...partialCall, method }))
  const [name, symbol, decimals, totalSupply] = useCalls(args)

  if (!name && !symbol && !decimals && !totalSupply) {
    return undefined
  }

  return {
    name: name?.value ?? '',
    symbol: symbol?.value ?? '',
    decimals: decimals?.value,
    totalSupply: totalSupply?.value,
  }
}
