"use strict";
exports.__esModule = true;
exports.shortenIfTransactionHash = exports.shortenTransactionHash = void 0;
var common_1 = require("./common");
function shortenTransactionHash(transactionHash) {
    if (transactionHash.length < 10) {
        throw new TypeError('Invalid input, transaction hash need to have at least 10 characters');
    }
    return common_1.shortenString(transactionHash);
}
exports.shortenTransactionHash = shortenTransactionHash;
function shortenIfTransactionHash(transactionHash) {
    if (typeof transactionHash === 'string' && transactionHash.length > 0) {
        return shortenTransactionHash(transactionHash);
    }
    return '';
}
exports.shortenIfTransactionHash = shortenIfTransactionHash;
//# sourceMappingURL=transaction.js.map