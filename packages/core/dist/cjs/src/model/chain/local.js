"use strict";
exports.__esModule = true;
exports.Hardhat = exports.Localhost = void 0;
exports.Localhost = {
    chainId: 1337,
    chainName: 'Localhost',
    isTestChain: true,
    isLocalChain: true,
    multicallAddress: '',
    getExplorerAddressLink: function () { return ''; },
    getExplorerTransactionLink: function () { return ''; }
};
exports.Hardhat = {
    chainId: 31337,
    chainName: 'Hardhat',
    isTestChain: true,
    isLocalChain: true,
    multicallAddress: '',
    getExplorerAddressLink: function () { return ''; },
    getExplorerTransactionLink: function () { return ''; }
};
exports["default"] = {
    Localhost: exports.Localhost,
    Hardhat: exports.Hardhat
};
//# sourceMappingURL=local.js.map