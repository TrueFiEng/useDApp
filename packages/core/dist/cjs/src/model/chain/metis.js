"use strict";
exports.__esModule = true;
exports.Stardust = void 0;
exports.Stardust = {
    chainId: 588,
    chainName: 'Stardust',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xaF9D4DC0698d8FD9f41387ecb08D9976079B8086',
    getExplorerAddressLink: function (address) { return "https://stardust-explorer.metis.io/" + address; },
    getExplorerTransactionLink: function (transactionHash) { return "https://stardust-explorer.metis.io/" + transactionHash; }
};
exports["default"] = { Stardust: exports.Stardust };
//# sourceMappingURL=metis.js.map