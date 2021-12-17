"use strict";
exports.__esModule = true;
exports.Harmony = void 0;
exports.Harmony = {
    chainId: 1666600000,
    chainName: 'Harmony',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xFE4980f62D708c2A84D3929859Ea226340759320',
    getExplorerAddressLink: function (address) { return "https://explorer.harmony.one/address/" + address; },
    getExplorerTransactionLink: function (transactionHash) { return "https://explorer.harmony.one/tx/" + transactionHash; }
};
exports["default"] = { Harmony: exports.Harmony };
//# sourceMappingURL=harmony.js.map