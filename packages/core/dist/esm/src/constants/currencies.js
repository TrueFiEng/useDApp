import { NativeCurrency, Token } from '../model';
import { ChainId } from './chainId';
export const Ether = new NativeCurrency('Ether', 'ETH', ChainId.Mainnet);
export const Dai = new Token('Dai', 'DAI', ChainId.Mainnet, '0x6B175474E89094C44Da98b954EedeAC495271d0F');
export const KovanEther = new NativeCurrency('Kovan Ether', 'KETH', ChainId.Kovan);
export const KovanDai = new Token('Dai', 'DAI', ChainId.Kovan, '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa');
export const BNB = new NativeCurrency('Binance Coin', 'BNB', ChainId.BSC);
export const BUSD = new Token('Binance USD', 'BUSD', ChainId.BSC, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56');
export const TestBNB = new NativeCurrency('Test Binance Coin', 'TBNB', ChainId.BSCTestnet);
export const TestBUSD = new Token('Test Binance USD', 'TBUSD', ChainId.BSCTestnet, '0x8301F2213c0eeD49a7E28Ae4c3e91722919B8B47');
export const NATIVE_CURRENCY = {
    [ChainId.Mainnet]: Ether,
    [ChainId.Kovan]: KovanEther,
    [ChainId.BSC]: BNB,
    [ChainId.BSCTestnet]: TestBNB,
};
//# sourceMappingURL=currencies.js.map