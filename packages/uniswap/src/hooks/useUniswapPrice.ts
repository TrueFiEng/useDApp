import { UniswapPairInterface, UNISWAP_V2_FACTORY_ADDRESS, INIT_CODE_HASH } from '../constants'
import { compareAddress, useContractCall } from '@usedapp/core'
import { pack, keccak256 } from '@ethersproject/solidity'
import { getCreate2Address } from '@ethersproject/address'
import { BigNumber, FixedNumber } from '@ethersproject/bignumber'

/**
 * @dev
 * `pair.getReserves` returns uint112 type,
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
  overrides?: { factory?: string; digits?: number }
): FixedNumber | undefined {
  // token0 is smaller than token1
  let token0: string
  let token1: string
  const digits = overrides?.digits || 8

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
    INIT_CODE_HASH
  )
  const reserves =
    useContractCall(
      token0 &&
        token1 && {
          abi: UniswapPairInterface,
          address: pair,
          method: 'getReserves',
          args: [],
        }
    ) ?? []

  if (!reserves) return

  const [numerator, denominator] = token0 === baseCurrency ? [reserves[1], reserves[0]] : [reserves[0], reserves[1]]
  const EXP_SCALE = BigNumber.from(10).pow(digits)
  const price = numerator.mul(EXP_SCALE).div(denominator)
  return FixedNumber.fromValue(price, digits)
}
