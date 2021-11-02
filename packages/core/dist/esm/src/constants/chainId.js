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
    ChainId[ChainId["RinkebyArbitrum"] = 421611] = "RinkebyArbitrum";
    //   ArbitrumOne = 42161
})(ChainId || (ChainId = {}));
export const CHAIN_NAMES = {
    [ChainId.Mainnet]: 'Mainnet',
    [ChainId.Ropsten]: 'Ropsten',
    [ChainId.Kovan]: 'Kovan',
    [ChainId.Rinkeby]: 'Rinkeby',
    [ChainId.Goerli]: 'Goerli',
    [ChainId.BSC]: 'BSC',
    [ChainId.BSCTestnet]: 'BSCTestnet',
    [ChainId.xDai]: 'xDai',
    [ChainId.Polygon]: 'Polygon',
    [ChainId.Theta]: 'Theta',
    [ChainId.ThetaTestnet]: 'ThetaTestnet',
    [ChainId.Moonriver]: 'Moonriver',
    [ChainId.Mumbai]: 'Mumbai',
    [ChainId.Harmony]: 'Harmony',
    [ChainId.Palm]: 'Palm',
    [ChainId.Localhost]: 'Localhost',
    [ChainId.Hardhat]: 'Hardhat',
    [ChainId.Fantom]: 'Fantom',
    [ChainId.RinkebyArbitrum]: 'RinkebyArbitrum',
};
export const MULTICALL_ADDRESSES = {
    [ChainId.Mainnet]: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
    [ChainId.Ropsten]: '0x53c43764255c17bd724f74c4ef150724ac50a3ed',
    [ChainId.Rinkeby]: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
    [ChainId.Goerli]: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
    [ChainId.Kovan]: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
    [ChainId.BSC]: '0x41263cba59eb80dc200f3e2544eda4ed6a90e76c',
    [ChainId.BSCTestnet]: '0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C',
    [ChainId.xDai]: '0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a',
    [ChainId.Polygon]: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
    [ChainId.Theta]: '0xe2ec58a54f3ab2714eddbae87533793011f1e14e',
    [ChainId.ThetaTestnet]: '0xf822bf2e728e264c58d7618022addd9cbc780350',
    [ChainId.Moonriver]: '0xa9177F8d98DAaB74C24715Ba0A81b73654710523',
    [ChainId.Mumbai]: '0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc',
    [ChainId.Harmony]: '0xFE4980f62D708c2A84D3929859Ea226340759320',
    [ChainId.Palm]: '0x99a73dfE34578348fb81BD078201C0BA84E9c840',
    [ChainId.Fantom]: '0xdc85396592f0F466224390771C861EE3957a3ff4',
    [ChainId.RinkebyArbitrum]: '0xFf79F208541DdF9dA6632dD851a269BbfA97d9aD'
};
export const TEST_CHAINS = [
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
export const LOCAL_CHAINS = [ChainId.Localhost, ChainId.Hardhat];
//# sourceMappingURL=chainId.js.map