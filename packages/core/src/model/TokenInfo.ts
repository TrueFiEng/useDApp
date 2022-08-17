import { BigNumberish } from 'ethers'

export interface TokenInfo {
  name: string
  symbol: string
  decimals?: number
  totalSupply?: BigNumberish
}
