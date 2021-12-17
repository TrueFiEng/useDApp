"use strict";
exports.__esModule = true;
exports.isLocalChain = exports.isTestChain = exports.getChainName = exports.getExplorerTransactionLink = exports.getExplorerAddressLink = exports.getChainById = void 0;
var constants_1 = require("../constants");
var getChainById = function (chainId) {
    return constants_1.DEFAULT_SUPPORTED_CHAINS.find(function (network) { return network.chainId === chainId; });
};
exports.getChainById = getChainById;
var deprecationWarning = function (methodName) {
    return console.warn(methodName + " is deprecated, can call with Chain directly");
};
var getExplorerAddressLink = function (address, chainId) {
    var _a;
    deprecationWarning('getExplorerAddressLink');
    return ((_a = exports.getChainById(chainId)) === null || _a === void 0 ? void 0 : _a.getExplorerAddressLink(address)) || '';
};
exports.getExplorerAddressLink = getExplorerAddressLink;
var getExplorerTransactionLink = function (transactionHash, chainId) {
    var _a;
    deprecationWarning('getExplorerTransactionLink');
    return ((_a = exports.getChainById(chainId)) === null || _a === void 0 ? void 0 : _a.getExplorerTransactionLink(transactionHash)) || '';
};
exports.getExplorerTransactionLink = getExplorerTransactionLink;
var getChainName = function (chainId) {
    var _a;
    deprecationWarning('getChainName');
    return ((_a = exports.getChainById(chainId)) === null || _a === void 0 ? void 0 : _a.chainName) || '';
};
exports.getChainName = getChainName;
var isTestChain = function (chainId) {
    var _a;
    deprecationWarning('isTestChain');
    return ((_a = exports.getChainById(chainId)) === null || _a === void 0 ? void 0 : _a.isTestChain) || false;
};
exports.isTestChain = isTestChain;
var isLocalChain = function (chainId) {
    var _a;
    deprecationWarning('isLocalChain');
    return ((_a = exports.getChainById(chainId)) === null || _a === void 0 ? void 0 : _a.isLocalChain) || false;
};
exports.isLocalChain = isLocalChain;
//# sourceMappingURL=chain.js.map