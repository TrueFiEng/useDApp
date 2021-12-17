"use strict";
exports.__esModule = true;
exports.xDai = void 0;
exports.xDai = {
    chainId: 100,
    chainName: 'xDai',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a',
    getExplorerAddressLink: function (address) { return "https://blockscout.com/poa/xdai/address/" + address + "/transactions"; },
    getExplorerTransactionLink: function (transactionHash) {
        return "https://blockscout.com/poa/xdai/tx/" + transactionHash + "/internal-transactions";
    }
};
exports["default"] = { xDai: exports.xDai };
//# sourceMappingURL=xdai.js.map