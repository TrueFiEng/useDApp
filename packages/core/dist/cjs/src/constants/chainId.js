"use strict";
exports.__esModule = true;
exports.ChainId = exports.DEFAULT_SUPPORTED_CHAINS = void 0;
// organize imports in alphabet order to sparse the conflict when adding a new chain
var model_1 = require("../model");
// rough alphabet order (put network from the same chain together)
exports.DEFAULT_SUPPORTED_CHAINS = [
    model_1.Localhost,
    model_1.Hardhat,
    model_1.Avalanche,
    model_1.Mainnet,
    model_1.Ropsten,
    model_1.Rinkeby,
    model_1.Goerli,
    model_1.Kovan,
    model_1.BSC,
    model_1.BSCTestnet,
    model_1.Fantom,
    model_1.Harmony,
    model_1.Stardust,
    model_1.Moonriver,
    model_1.MoonbaseAlpha,
    model_1.Palm,
    model_1.Polygon,
    model_1.Mumbai,
    model_1.Songbird,
    model_1.Theta,
    model_1.ThetaTestnet,
    model_1.xDai,
];
var ChainId;
(function (ChainId) {
    ChainId[ChainId["Mainnet"] = 1] = "Mainnet";
    ChainId[ChainId["Ropsten"] = 3] = "Ropsten";
    ChainId[ChainId["Rinkeby"] = 4] = "Rinkeby";
    ChainId[ChainId["Goerli"] = 5] = "Goerli";
    ChainId[ChainId["Kovan"] = 42] = "Kovan";
    ChainId[ChainId["BSC"] = 56] = "BSC";
    ChainId[ChainId["BSCTestnet"] = 97] = "BSCTestnet";
    ChainId[ChainId["xDai"] = 100] = "xDai";
    ChainId[ChainId["Polygon"] = 137] = "Polygon";
    ChainId[ChainId["Theta"] = 361] = "Theta";
    ChainId[ChainId["ThetaTestnet"] = 365] = "ThetaTestnet";
    ChainId[ChainId["Moonriver"] = 1285] = "Moonriver";
    ChainId[ChainId["Mumbai"] = 80001] = "Mumbai";
    ChainId[ChainId["Harmony"] = 1666600000] = "Harmony";
    ChainId[ChainId["Palm"] = 11297108109] = "Palm";
    ChainId[ChainId["Localhost"] = 1337] = "Localhost";
    ChainId[ChainId["Hardhat"] = 31337] = "Hardhat";
    ChainId[ChainId["Fantom"] = 250] = "Fantom";
    ChainId[ChainId["Avalanche"] = 43114] = "Avalanche";
    ChainId[ChainId["Songbird"] = 19] = "Songbird";
    ChainId[ChainId["MoonbaseAlpha"] = 1287] = "MoonbaseAlpha";
    ChainId[ChainId["Stardust"] = 1287] = "Stardust";
})(ChainId = exports.ChainId || (exports.ChainId = {}));
//# sourceMappingURL=chainId.js.map