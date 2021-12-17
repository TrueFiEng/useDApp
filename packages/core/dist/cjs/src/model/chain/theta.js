"use strict";
exports.__esModule = true;
exports.ThetaTestnet = exports.Theta = void 0;
exports.Theta = {
    chainId: 361,
    chainName: 'Theta',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xe2ec58a54f3ab2714eddbae87533793011f1e14e',
    getExplorerAddressLink: function (address) { return "https://explorer.thetatoken.org/address/" + address; },
    getExplorerTransactionLink: function (transactionHash) { return "https://explorer.thetatoken.org/tx/" + transactionHash; }
};
exports.ThetaTestnet = {
    chainId: 365,
    chainName: 'ThetaTestnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xf822bf2e728e264c58d7618022addd9cbc780350',
    getExplorerAddressLink: function (address) { return "https://testnet-explorer.thetatoken.org/address/" + address; },
    getExplorerTransactionLink: function (transactionHash) {
        return "https://testnet-explorer.thetatoken.org/tx/" + transactionHash;
    }
};
exports["default"] = {
    Theta: exports.Theta,
    ThetaTestnet: exports.ThetaTestnet
};
//# sourceMappingURL=theta.js.map