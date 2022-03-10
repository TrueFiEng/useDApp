"use strict";
exports.__esModule = true;
exports.PalmTestnet = exports.Palm = void 0;
exports.Palm = {
    chainId: 11297108109,
    chainName: 'Palm',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x99a73dfE34578348fb81BD078201C0BA84E9c840',
    getExplorerAddressLink: function (address) { return "https://explorer.palm.io/address/".concat(address); },
    getExplorerTransactionLink: function (transactionHash) { return "https://explorer.palm.io/tx/".concat(transactionHash); }
};
exports.PalmTestnet = {
    chainId: 11297108099,
    chainName: 'Palm Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x99a73dfE34578348fb81BD078201C0BA84E9c840',
    getExplorerAddressLink: function (address) { return "https://explorer.palm-uat.xyz/address/".concat(address); },
    getExplorerTransactionLink: function (transactionHash) { return "https://explorer.palm-uat.xyz/tx/".concat(transactionHash); }
};
exports["default"] = { Palm: exports.Palm, PalmTestnet: exports.PalmTestnet };
//# sourceMappingURL=palm.js.map