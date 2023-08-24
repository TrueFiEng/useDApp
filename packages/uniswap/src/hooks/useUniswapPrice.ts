import { useMemo } from 'react'
import { UniswapPairInterface, UNISWAP_V2_FACTORY_ADDRESS, INIT_CODE_HASH } from '../constants'
import { compareAddress, useCall } from '@usedapp/core'
import { getCreate2Address, solidityPackedKeccak256, BaseContract } from 'ethers'

/**
 * function`getReserves` of UniswapV2Pair returns uint112 type,
 * so we simply divide the reserve of quote token into the reserve of base token
 * e.g ETH/DAI reserve of Dai / the reserve of WETH
 * If there is no direct path or unconnected, the call returns `undefined`
 *
 * @param baseCurrency address of base token (e.g ETH address)
 * @param quoteCurrency address of quote token (e.g DAI address)
 * @param overrides optional factory address (For Sushiswap, default Uniswap V2 Factory)
 * @returns peek price
 */
export function useUniswapPrice(
  baseCurrency: string,
  quoteCurrency: string,
  overrides?: { factory?: string; initCodeHash?: string; digits?: number }
): bigint | undefined {
  const digits = overrides?.digits || 18

  const [token0, token1] = useMemo(() => {
    // token0 is smaller than token1
    return compareAddress(baseCurrency, quoteCurrency) === -1
      ? [baseCurrency, quoteCurrency]
      : [quoteCurrency, baseCurrency]
  }, [baseCurrency, quoteCurrency])

  const pair = getCreate2Address(
    overrides?.factory || UNISWAP_V2_FACTORY_ADDRESS[1], // Mainnet
    solidityPackedKeccak256(['address', 'address'], [token0, token1]),
    overrides?.initCodeHash || INIT_CODE_HASH
  )
  const { value } =
    useCall(
      token0 &&
        token1 && {
          contract: new BaseContract(pair, UniswapPairInterface),
          method: 'getReserves',
          args: [],
        }
    ) ?? {}

  const [reserve0, reserve1] = value?.length >= 2 ? value : []

  return useMemo(() => {
    if (!reserve0 || !reserve1) return
    const [numerator, denominator] = token0 === baseCurrency ? [reserve1, reserve0] : [reserve0, reserve1]
    const EXP_SCALE = powerOf10(digits)
    return (numerator * EXP_SCALE) / denominator
  }, [reserve0, reserve1])
}

export function powerOf10(digits: number): bigint {
  let result = BigInt(1)
  for (let i = 0; i < digits; i++) {
    result *= BigInt(10)
  }
  return result
}
