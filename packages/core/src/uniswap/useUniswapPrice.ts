import { UniswapPairInterface, UNISWAP_V2_FACTORY_ADDRESS, INIT_CODE_HASH } from '../constants'
import { useContractCall } from '../hooks'
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
 * @param baseCurrency address of base token (e.g ETH)
 * @param quateCurrency address of quate token (e.g DAI)
 * @param overrides optional factory address (For Sushiswap, default Uniswap V2 Factory)
 * @returns {FixedNumber | undefined} peek price
 */
export function useUniswapPrice(
  baseCurrency: string,
  quateCurrency: string,
  overrides?: { factory?: string; digits?: number }
): FixedNumber | undefined {
  const digits = overrides?.digits || 8

  const [token0, token1] =
    parseInt(baseCurrency, 16) < parseInt(quateCurrency, 16)
      ? [baseCurrency, quateCurrency]
      : [quateCurrency, baseCurrency]
  const computedAddress = getCreate2Address(
    overrides?.factory || UNISWAP_V2_FACTORY_ADDRESS[1], // Mainnet
    keccak256(['bytes'], [pack(['address', 'address'], [token0, token1])]),
    INIT_CODE_HASH
  )
  const [reserve0, reserve1] =
    useContractCall(
      baseCurrency &&
        quateCurrency && {
          abi: UniswapPairInterface,
          address: computedAddress,
          method: 'getReserves',
          args: [],
        }
    ) ?? []

  if (!reserve0 || !reserve1) return

  const EXP_SCALE = BigNumber.from(10).pow(digits)
  const price = token0 === baseCurrency ? reserve1.mul(EXP_SCALE).div(reserve0) : reserve0.mul(EXP_SCALE).div(reserve1)
  return FixedNumber.fromValue(price, digits)
}
