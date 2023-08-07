import { useMemo } from 'react'
import { UniswapPairInterface, UNISWAP_V2_FACTORY_ADDRESS, INIT_CODE_HASH } from '../constants'
import { compareAddress, useContractCall } from '@usedapp/core'
import { BigNumber } from 'ethers'
import { getCreate2Address, solidityPack, solidityKeccak256 } from 'ethers'

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
): BigNumber | undefined {
  const digits = overrides?.digits || 18

  const [token0, token1] = useMemo(() => {
    // token0 is smaller than token1
    return compareAddress(baseCurrency, quoteCurrency) === -1
      ? [baseCurrency, quoteCurrency]
      : [quoteCurrency, baseCurrency]
  }, [baseCurrency, quoteCurrency])

  const pair = getCreate2Address(
    overrides?.factory || UNISWAP_V2_FACTORY_ADDRESS[1], // Mainnet
    solidityKeccak256(['bytes'], [solidityPack(['address', 'address'], [token0, token1])]),
    overrides?.initCodeHash || INIT_CODE_HASH
  )
  const [reserve0, reserve1] =
    useContractCall(
      token0 &&
        token1 && {
          abi: UniswapPairInterface,
          address: pair,
          method: 'getReserves',
          args: [],
        }
    ) ?? []

  return useMemo(() => {
    if (!reserve0 || !reserve1) return
    const [numerator, denominator] = token0 === baseCurrency ? [reserve1, reserve0] : [reserve0, reserve1]
    const EXP_SCALE = BigNumber.from(10).pow(digits)
    return numerator.mul(EXP_SCALE).div(denominator)
  }, [reserve0, reserve1])
}
