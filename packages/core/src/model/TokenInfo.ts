import { BigNumberish } from 'ethers'

/**
 * Represents general token information.
 *
 * @public
 */
export interface TokenInfo {
  /**
   * token name or an empty string.
   */
  name: string
  /**
   * token symbol or an empty string.
   */
  symbol: string
  /**
   * optional field that contains token decimals.
   */
  decimals?: number
  /**
   * optional field that contains total supply of the token.
   */
  totalSupply?: BigNumberish
}
