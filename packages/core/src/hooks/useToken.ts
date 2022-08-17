import { ERC20Interface } from '../constants'
import { Falsy } from '../model/types'
import { TokenInfo } from '../model/TokenInfo'
import { Call, useCalls } from './useCall'
import { Contract } from 'ethers'

/**
 * Returns name, symbol, decimals and token supply of a given token.
 * @param tokenAddress address of a token contract.
 * @returns a token info object (see {@link TokenInfo}) or `undefined` if all four methods don't exist on a token.
 * @public
 * @example
 * const DAI_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f'
 * const daiInfo = useToken(DAI_ADDRESS)
 *
 * return daiInfo ? (
 *   <>
 *     <p>Dai name: {daiInfo?.name}</p>
 *     <p>Dai symbol: {daiInfo?.symbol}</p>
 *     <p>Dai decimals: {daiInfo?.decimals}</p>
 *     <p>Dai totalSupply: {daiInfo?.totalSupply ? formatUnits(daiInfo?.totalSupply, daiInfo?.decimals) : ''}</p>
 *   </>
 * ) : null
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
