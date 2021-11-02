export function getStoredTransactionState(transaction) {
    if (transaction.receipt) {
        return (transaction === null || transaction === void 0 ? void 0 : transaction.receipt.status) === 0 ? 'Fail' : 'Success';
    }
    return 'Mining';
}
export const DEFAULT_STORED_TRANSACTIONS = {};
//# sourceMappingURL=model.js.map