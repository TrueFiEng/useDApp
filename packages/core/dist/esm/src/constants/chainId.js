// organize imports in alphabet order to sparse the conflict when adding a new chain
import { Localhost, Hardhat, Avalanche, BSC, BSCTestnet, Fantom, Harmony, Mainnet, Ropsten, Rinkeby, Goerli, Kovan, Stardust, Moonriver, MoonbaseAlpha, Palm, Polygon, Mumbai, Songbird, Theta, ThetaTestnet, xDai, } from '../model';
// rough alphabet order (put network from the same chain together)
export const DEFAULT_SUPPORTED_CHAINS = [
    Localhost,
    Hardhat,
    Avalanche,
    Mainnet,
    Ropsten,
    Rinkeby,
    Goerli,
    Kovan,
    BSC,
    BSCTestnet,
    Fantom,
    Harmony,
    Stardust,
    Moonriver,
    MoonbaseAlpha,
    Palm,
    Polygon,
    Mumbai,
    Songbird,
    Theta,
    ThetaTestnet,
    xDai,
];
export var ChainId;
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
})(ChainId || (ChainId = {}));
//# sourceMappingURL=chainId.js.map