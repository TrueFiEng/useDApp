"use strict";
var _a, _b;
exports.__esModule = true;
exports.LOCAL_CHAINS = exports.TEST_CHAINS = exports.MULTICALL_ADDRESSES = exports.CHAIN_NAMES = exports.ChainId = void 0;
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
    ChainId[ChainId["RinkebyArbitrum"] = 421611] = "RinkebyArbitrum";
    //   ArbitrumOne = 42161
})(ChainId = exports.ChainId || (exports.ChainId = {}));
exports.CHAIN_NAMES = (_a = {},
    _a[ChainId.Mainnet] = 'Mainnet',
    _a[ChainId.Ropsten] = 'Ropsten',
    _a[ChainId.Kovan] = 'Kovan',
    _a[ChainId.Rinkeby] = 'Rinkeby',
    _a[ChainId.Goerli] = 'Goerli',
    _a[ChainId.BSC] = 'BSC',
    _a[ChainId.BSCTestnet] = 'BSCTestnet',
    _a[ChainId.xDai] = 'xDai',
    _a[ChainId.Polygon] = 'Polygon',
    _a[ChainId.Theta] = 'Theta',
    _a[ChainId.ThetaTestnet] = 'ThetaTestnet',
    _a[ChainId.Moonriver] = 'Moonriver',
    _a[ChainId.Mumbai] = 'Mumbai',
    _a[ChainId.Harmony] = 'Harmony',
    _a[ChainId.Palm] = 'Palm',
    _a[ChainId.Localhost] = 'Localhost',
    _a[ChainId.Hardhat] = 'Hardhat',
    _a[ChainId.Fantom] = 'Fantom',
    _a[ChainId.RinkebyArbitrum] = 'RinkebyArbitrum',
    _a);
exports.MULTICALL_ADDRESSES = (_b = {},
    _b[ChainId.Mainnet] = '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
    _b[ChainId.Ropsten] = '0x53c43764255c17bd724f74c4ef150724ac50a3ed',
    _b[ChainId.Rinkeby] = '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
    _b[ChainId.Goerli] = '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
    _b[ChainId.Kovan] = '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
    _b[ChainId.BSC] = '0x41263cba59eb80dc200f3e2544eda4ed6a90e76c',
    _b[ChainId.BSCTestnet] = '0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C',
    _b[ChainId.xDai] = '0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a',
    _b[ChainId.Polygon] = '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
    _b[ChainId.Theta] = '0xe2ec58a54f3ab2714eddbae87533793011f1e14e',
    _b[ChainId.ThetaTestnet] = '0xf822bf2e728e264c58d7618022addd9cbc780350',
    _b[ChainId.Moonriver] = '0xa9177F8d98DAaB74C24715Ba0A81b73654710523',
    _b[ChainId.Mumbai] = '0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc',
    _b[ChainId.Harmony] = '0xFE4980f62D708c2A84D3929859Ea226340759320',
    _b[ChainId.Palm] = '0x99a73dfE34578348fb81BD078201C0BA84E9c840',
    _b[ChainId.Fantom] = '0xdc85396592f0F466224390771C861EE3957a3ff4',
    _b[ChainId.RinkebyArbitrum] = '0xFf79F208541DdF9dA6632dD851a269BbfA97d9aD',
    _b);
exports.TEST_CHAINS = [
    ChainId.Ropsten,
    ChainId.Kovan,
    ChainId.Rinkeby,
    ChainId.BSCTestnet,
    ChainId.Goerli,
    ChainId.Mumbai,
    ChainId.ThetaTestnet,
    ChainId.Localhost,
    ChainId.Hardhat,
    ChainId.RinkebyArbitrum
];
exports.LOCAL_CHAINS = [ChainId.Localhost, ChainId.Hardhat];
//# sourceMappingURL=chainId.js.map