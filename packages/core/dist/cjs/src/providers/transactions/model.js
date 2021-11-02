"use strict";
exports.__esModule = true;
exports.DEFAULT_STORED_TRANSACTIONS = exports.getStoredTransactionState = void 0;
function getStoredTransactionState(transaction) {
    if (transaction.receipt) {
        return (transaction === null || transaction === void 0 ? void 0 : transaction.receipt.status) === 0 ? 'Fail' : 'Success';
    }
    return 'Mining';
}
exports.getStoredTransactionState = getStoredTransactionState;
exports.DEFAULT_STORED_TRANSACTIONS = {};
//# sourceMappingURL=model.js.map