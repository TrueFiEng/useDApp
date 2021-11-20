import { UniswapPairInterface, UNISWAP_V2_FACTORY_ADDRESS, INIT_CODE_HASH } from '../constants'
import { compareAddress, useContractCall } from '@usedapp/core'
import { pack, keccak256 } from '@ethersproject/solidity'
import { getCreate2Address } from '@ethersproject/address'
import { BigNumber, parseFixed, formatFixed } from '@ethersproject/bignumber'

/**
 * @dev
 * function`getReserves` of UniswapV2Pair returns uint112 type,
 * so we simply divide the reserve of quate token into the reserve of base token
 * e.g ETH/DAI reserve of Dai / the reserve of WETH
 * If there is no direct path or unconnected, the call returns `undefined`
 *
 * @param {string} baseCurrency address of base token (e.g ETH address)
 * @param {string} quateCurrency address of quate token (e.g DAI address)
 * @param {Object} overrides optional factory address (For Sushiswap, default Uniswap V2 Factory)
 * @returns {FixedNumber | undefined} peek price
 */
export function useUniswapPrice(
  baseCurrency: string,
  quateCurrency: string,
  overrides?: { factory?: string; initCodeHash?:string; digits?: number }
): BigNumber | undefined {
  // token0 is smaller than token1
  let token0: string
  let token1: string
  const digits = overrides?.digits || 18

  try {
    ;[token0, token1] =
      compareAddress(baseCurrency, quateCurrency) === -1 ? [baseCurrency, quateCurrency] : [quateCurrency, baseCurrency]
  } catch (error) {
    console.log(error)
    return
  }

  const pair = getCreate2Address(
    overrides?.factory || UNISWAP_V2_FACTORY_ADDRESS[1], // Mainnet
    keccak256(['bytes'], [pack(['address', 'address'], [token0, token1])]),
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

  if (!reserve0 || !reserve1) return

  const [numerator, denominator] = token0 === baseCurrency ? [reserve1, reserve0] : [reserve0, reserve1]
  const EXP_SCALE = BigNumber.from(10).pow(digits)
  const price: BigNumber = numerator.mul(EXP_SCALE).div(denominator)

  return parseFixed(formatFixed(price, digits), digits)
}
