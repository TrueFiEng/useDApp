"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Gnosis = exports.xDai = void 0;
exports.xDai = {
    chainId: 100,
    chainName: 'xDai',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a',
    getExplorerAddressLink: function (address) { return "https://blockscout.com/poa/xdai/address/".concat(address, "/transactions"); },
    getExplorerTransactionLink: function (transactionHash) {
        return "https://blockscout.com/poa/xdai/tx/".concat(transactionHash, "/internal-transactions");
    }
};
// xdai alias
exports.Gnosis = __assign(__assign({}, exports.xDai), { chainName: 'Gnosis' });
exports["default"] = { xDai: exports.xDai, Gnosis: exports.Gnosis };
//# sourceMappingURL=xdai.js.map