"use strict";
exports.__esModule = true;
exports.Optimism = exports.OptimismKovan = void 0;
exports.OptimismKovan = {
    chainId: 69,
    chainName: 'OptimismKovan',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xE71bf4622578c7d1526A88CD3060f03030E99a04',
    getExplorerAddressLink: function (address) { return "https://kovan-optimistic.etherscan.io/address/".concat(address); },
    getExplorerTransactionLink: function (transactionHash) {
        return "https://kovan-optimistic.etherscan.io/tx/".concat(transactionHash);
    }
};
exports.Optimism = {
    chainId: 10,
    chainName: 'Optimism',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x35A6Cdb2C9AD4a45112df4a04147EB07dFA01aB7',
    getExplorerAddressLink: function (address) { return "https://optimistic.etherscan.io/address/".concat(address); },
    getExplorerTransactionLink: function (transactionHash) { return "https://optimistic.etherscan.io/tx/".concat(transactionHash); }
};
exports["default"] = {
    OptimismKovan: exports.OptimismKovan,
    Optimism: exports.Optimism
};
//# sourceMappingURL=optimism.js.map