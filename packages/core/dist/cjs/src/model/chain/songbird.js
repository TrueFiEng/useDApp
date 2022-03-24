"use strict";
exports.__esModule = true;
exports.Songbird = void 0;
exports.Songbird = {
    chainId: 19,
    chainName: 'Songbird',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x60351436cf80A31EA6C3B261C784d3C127dBD6f1',
    getExplorerAddressLink: function (address) { return "https://songbird-explorer.flare.network/address/".concat(address); },
    getExplorerTransactionLink: function (transactionHash) {
        return "https://songbird-explorer.flare.network/tx/".concat(transactionHash);
    }
};
//# sourceMappingURL=songbird.js.map