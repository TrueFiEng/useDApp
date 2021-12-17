"use strict";
exports.__esModule = true;
exports.Avalanche = void 0;
exports.Avalanche = {
    chainId: 43114,
    chainName: 'Avalanche',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
    getExplorerAddressLink: function (address) { return "https://snowtrace.io/address/" + address; },
    getExplorerTransactionLink: function (transactionHash) { return "https://snowtrace.io/tx/" + transactionHash; }
};
exports["default"] = { Avalanche: exports.Avalanche };
//# sourceMappingURL=avalanche.js.map