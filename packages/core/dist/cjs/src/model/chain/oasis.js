"use strict";
exports.__esModule = true;
exports.OasisEmeraldTestnet = exports.OasisEmerald = void 0;
exports.OasisEmerald = {
    chainId: 42262,
    chainName: 'OasisEmerald',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xA1513CE1a147BB84E04cD61d877d598C018a460F',
    getExplorerAddressLink: function (address) { return "https://explorer.emerald.oasis.dev/address/".concat(address, "/transactions"); },
    getExplorerTransactionLink: function (transactionHash) {
        return "https://explorer.emerald.oasis.dev/tx/".concat(transactionHash, "/internal-transactions");
    }
};
exports.OasisEmeraldTestnet = {
    chainId: 42261,
    chainName: 'OasisEmeraldTestnet',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xB2929229096d2ee6850c4d3906ef2d1f1330cdc7',
    getExplorerAddressLink: function (address) { return "https://testnet.explorer.emerald.oasis.dev/address/".concat(address, "/transactions"); },
    getExplorerTransactionLink: function (transactionHash) {
        return "https://testnet.explorer.emerald.oasis.dev/tx/".concat(transactionHash, "/internal-transactions");
    }
};
exports["default"] = { OasisEmerald: exports.OasisEmerald, OasisEmeraldTestnet: exports.OasisEmeraldTestnet };
//# sourceMappingURL=oasis.js.map