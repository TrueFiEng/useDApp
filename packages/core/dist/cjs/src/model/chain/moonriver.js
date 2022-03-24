"use strict";
exports.__esModule = true;
exports.MoonbaseAlpha = exports.Moonriver = void 0;
exports.Moonriver = {
    chainId: 1285,
    chainName: 'Moonriver',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xa9177F8d98DAaB74C24715Ba0A81b73654710523',
    getExplorerAddressLink: function (address) {
        return "https://blockscout.moonriver.moonbeam.network/address/".concat(address, "/transactions");
    },
    getExplorerTransactionLink: function (transactionHash) {
        return "https://blockscout.moonriver.moonbeam.network/tx/".concat(transactionHash, "/internal-transactions");
    }
};
exports.MoonbaseAlpha = {
    chainId: 1287,
    chainName: 'Moonbase Alpha',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x4E2cfca20580747AdBA58cd677A998f8B261Fc21',
    getExplorerAddressLink: function (address) { return "https://moonbase.moonscan.io/address/".concat(address); },
    getExplorerTransactionLink: function (transactionHash) { return "https://moonbase.moonscan.io/tx/".concat(transactionHash); }
};
exports["default"] = { Moonriver: exports.Moonriver };
//# sourceMappingURL=moonriver.js.map