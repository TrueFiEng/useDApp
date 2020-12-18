import { Currency, Token } from '../model'
import { ChainId } from './chainId'

export const Ether = new Currency(ChainId.Mainnet, 'Ether', 'ETH', 18)
export const Dai = new Token(ChainId.Mainnet, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 'Dai', 'DAI', 18)

export const RopstenEther = new Currency(ChainId.Ropsten, 'Ether', 'ETH', 18)
export const RopstenDai = new Token(ChainId.Ropsten, '', 'Dai', 'DAI', 18)

export const RinkebyEther = new Currency(ChainId.Rinkeby, 'Ether', 'ETH', 18)
export const RinkebyDai = new Token(ChainId.Rinkeby, '', 'Dai', 'DAI', 18)

export const GoerliEther = new Currency(ChainId.Goerli, 'Ether', 'ETH', 18)
export const GoerliDai = new Token(ChainId.Goerli, '', 'Dai', 'DAI', 18)

export const KovanEther = new Currency(ChainId.Kovan, 'Kovan Ether', 'KETH', 18)
export const KovanDai = new Token(ChainId.Kovan, '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa', 'Dai', 'DAI', 18)

export const NATIVE_CURRENCY = {
  [ChainId.Mainnet]: Ether,
  [ChainId.Ropsten]: RopstenEther,
  [ChainId.Rinkeby]: RinkebyEther,
  [ChainId.Goerli]: GoerliEther,
  [ChainId.Kovan]: KovanEther,
}
