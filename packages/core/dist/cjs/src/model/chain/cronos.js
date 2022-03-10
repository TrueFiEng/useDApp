"use strict";
exports.__esModule = true;
exports.CronosTestnet = exports.Cronos = void 0;
exports.Cronos = {
    chainId: 25,
    chainName: 'Cronos',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x0fA4d452693F2f45D28c4EC4d20b236C4010dA74',
    getExplorerAddressLink: function (address) { return "https://cronoscan.com/address/".concat(address); },
    getExplorerTransactionLink: function (transactionHash) { return "https://cronoscan.com/tx/".concat(transactionHash); }
};
exports.CronosTestnet = {
    chainId: 338,
    chainName: 'CronosTestnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x6a8c1ba309136D78245f1F0a14790239b71a9577',
    getExplorerAddressLink: function (address) { return "https://cronos.crypto.org/explorer/testnet3/address/".concat(address); },
    getExplorerTransactionLink: function (transactionHash) {
        return "https://cronos.crypto.org/explorer/testnet3/tx/".concat(transactionHash);
    }
};
exports["default"] = {
    Cronos: exports.Cronos,
    CronosTestnet: exports.CronosTestnet
};
//# sourceMappingURL=cronos.js.map