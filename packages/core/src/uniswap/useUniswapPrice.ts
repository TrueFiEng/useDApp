import { UniswapPairInterface, UNISWAP_V2_FACTORY_ADDRESS, INIT_CODE_HASH } from '../constants'
import { useContractCall } from '../hooks'
import { pack, keccak256 } from '@ethersproject/solidity'
import { getCreate2Address } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'

export const sortAddress = (tokenA: string, tokenB: string) => {
  return parseInt(tokenA, 16) < parseInt(tokenB, 16) ? [tokenA, tokenB] : [tokenB, tokenA]
}

export function useUniswapPrice(
  baseCurrency: string,
  quateCurrency: string,
  overrides?: { factory: string }
): BigNumber | undefined {
  const [token0, token1] = sortAddress(baseCurrency, quateCurrency)
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

  if (BigNumber.isBigNumber(reserve0) && BigNumber.isBigNumber(reserve1)) {
    const EXP_SCALE = BigNumber.from('10').pow('18')
    return token0 === baseCurrency ? reserve1.mul(EXP_SCALE).div(reserve0) : reserve0.mul(EXP_SCALE).div(reserve1)
  }
}
