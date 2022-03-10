"use strict";
exports.__esModule = true;
exports.ThunderCoreTestnet = exports.ThunderCore = void 0;
exports.ThunderCore = {
    chainId: 108,
    chainName: 'ThunderCore Mainnet',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x3017086DeEf56679e267F67F66c4415109b7A97f',
    multicall2Address: '0xd1dC5CF410b227dFEeFEe8D3c1C9DB4FBE66d362',
    getExplorerAddressLink: function (address) { return "https://viewblock.io/thundercore/address/".concat(address); },
    getExplorerTransactionLink: function (transactionHash) { return "https://viewblock.io/thundercore/tx/".concat(transactionHash); }
};
exports.ThunderCoreTestnet = {
    chainId: 18,
    chainName: 'ThunderCore Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x7818a6A0fFe134b2aF30850DCE7c86A52eC6AC4F',
    multicall2Address: '0x02C5503dd793cC457a1CE50d2d31a749cb5e9cB5',
    getExplorerAddressLink: function (address) { return "https://explorer-testnet.thundercore.com/address/".concat(address); },
    getExplorerTransactionLink: function (transactionHash) {
        return "https://explorer-testnet.thundercore.com/tx/".concat(transactionHash);
    }
};
exports["default"] = {
    ThunderCore: exports.ThunderCore,
    ThunderCoreTestnet: exports.ThunderCoreTestnet
};
//# sourceMappingURL=thundercore.js.map