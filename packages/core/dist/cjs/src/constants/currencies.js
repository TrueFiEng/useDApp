"use strict";
var _a;
exports.__esModule = true;
exports.NATIVE_CURRENCY = exports.TestBUSD = exports.TestBNB = exports.BUSD = exports.BNB = exports.KovanDai = exports.KovanEther = exports.Dai = exports.Ether = void 0;
var model_1 = require("../model");
var chainId_1 = require("./chainId");
exports.Ether = new model_1.NativeCurrency('Ether', 'ETH', chainId_1.ChainId.Mainnet);
exports.Dai = new model_1.Token('Dai', 'DAI', chainId_1.ChainId.Mainnet, '0x6B175474E89094C44Da98b954EedeAC495271d0F');
exports.KovanEther = new model_1.NativeCurrency('Kovan Ether', 'KETH', chainId_1.ChainId.Kovan);
exports.KovanDai = new model_1.Token('Dai', 'DAI', chainId_1.ChainId.Kovan, '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa');
exports.BNB = new model_1.NativeCurrency('Binance Coin', 'BNB', chainId_1.ChainId.BSC);
exports.BUSD = new model_1.Token('Binance USD', 'BUSD', chainId_1.ChainId.BSC, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56');
exports.TestBNB = new model_1.NativeCurrency('Test Binance Coin', 'TBNB', chainId_1.ChainId.BSCTestnet);
exports.TestBUSD = new model_1.Token('Test Binance USD', 'TBUSD', chainId_1.ChainId.BSCTestnet, '0x8301F2213c0eeD49a7E28Ae4c3e91722919B8B47');
exports.NATIVE_CURRENCY = (_a = {},
    _a[chainId_1.ChainId.Mainnet] = exports.Ether,
    _a[chainId_1.ChainId.Kovan] = exports.KovanEther,
    _a[chainId_1.ChainId.BSC] = exports.BNB,
    _a[chainId_1.ChainId.BSCTestnet] = exports.TestBNB,
    _a);
//# sourceMappingURL=currencies.js.map