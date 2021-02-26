import { NativeCurrency, Token } from '../model'
import { ChainId } from './chainId'

export const Ether = new NativeCurrency('Ether', 'ETH', ChainId.Mainnet)
export const Dai = new Token('Dai', 'DAI', ChainId.Mainnet, '0x6B175474E89094C44Da98b954EedeAC495271d0F')

export const KovanEther = new NativeCurrency('Kovan Ether', 'KETH', ChainId.Kovan)
export const KovanDai = new Token('Dai', 'DAI', ChainId.Kovan, '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa')

export const NATIVE_CURRENCY = {
  [ChainId.Mainnet]: Ether,
  [ChainId.Kovan]: KovanEther,
}
