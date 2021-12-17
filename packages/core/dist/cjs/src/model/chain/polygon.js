"use strict";
exports.__esModule = true;
exports.Mumbai = exports.Polygon = void 0;
exports.Polygon = {
    chainId: 137,
    chainName: 'Polygon',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
    getExplorerAddressLink: function (address) {
        return "https://explorer-mainnet.maticvigil.com/address/" + address + "/transactions";
    },
    getExplorerTransactionLink: function (transactionHash) {
        return "https://explorer-mainnet.maticvigil.com/tx/" + transactionHash + "/internal-transactions";
    }
};
exports.Mumbai = {
    chainId: 80001,
    chainName: 'Mumbai',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc',
    getExplorerAddressLink: function (address) { return "https://explorer-mumbai.maticvigil.com/address/" + address + "/transactions"; },
    getExplorerTransactionLink: function (transactionHash) {
        return "https://explorer-mumbai.maticvigil.com/tx/" + transactionHash + "/internal-transactions";
    }
};
exports["default"] = { Polygon: exports.Polygon, Mumbai: exports.Mumbai };
//# sourceMappingURL=polygon.js.map