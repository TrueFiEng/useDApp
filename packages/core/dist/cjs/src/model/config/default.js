"use strict";
exports.__esModule = true;
exports.DEFAULT_CONFIG = void 0;
var constants_1 = require("../../constants");
exports.DEFAULT_CONFIG = {
    pollingInterval: 15000,
    supportedChains: [
        constants_1.ChainId.Mainnet,
        constants_1.ChainId.Goerli,
        constants_1.ChainId.Kovan,
        constants_1.ChainId.Rinkeby,
        constants_1.ChainId.Ropsten,
        constants_1.ChainId.BSC,
        constants_1.ChainId.BSCTestnet,
        constants_1.ChainId.xDai,
        constants_1.ChainId.Localhost,
        constants_1.ChainId.Hardhat,
        constants_1.ChainId.Polygon,
        constants_1.ChainId.Mumbai,
        constants_1.ChainId.Theta,
        constants_1.ChainId.ThetaTestnet,
        constants_1.ChainId.Harmony,
        constants_1.ChainId.Moonriver,
        constants_1.ChainId.Palm,
        constants_1.ChainId.Fantom,
    ],
    notifications: {
        checkInterval: 500,
        expirationPeriod: 5000
    },
    localStorage: {
        transactionPath: 'transactions'
    }
};
//# sourceMappingURL=default.js.map