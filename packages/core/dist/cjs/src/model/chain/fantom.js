"use strict";
exports.__esModule = true;
exports.Fantom = void 0;
exports.Fantom = {
    chainId: 250,
    chainName: 'Fantom',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xdc85396592f0F466224390771C861EE3957a3ff4',
    getExplorerAddressLink: function (address) { return "https://ftmscan.com/address/" + address; },
    getExplorerTransactionLink: function (transactionHash) { return "https://ftmscan.com/tx/" + transactionHash; }
};
exports["default"] = { Fantom: exports.Fantom };
//# sourceMappingURL=fantom.js.map