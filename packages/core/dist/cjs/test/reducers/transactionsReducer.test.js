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
var chai_1 = require("chai");
var reducer_1 = require("../../src/providers/transactions/reducer");
describe('transactionsReducer', function () {
    it('addTransaction', function () {
        var transaction = {
            transaction: { chainId: 1 },
            submittedAt: 10
        };
        chai_1.expect(reducer_1.transactionReducer({}, { type: 'ADD_TRANSACTION', payload: transaction })).to.deep.eq({
            1: [transaction]
        });
    });
    it('correct order', function () {
        var initial = {
            transaction: { chainId: 1 },
            submittedAt: 10
        };
        var added = {
            transaction: { chainId: 1 },
            submittedAt: 30
        };
        var newState = reducer_1.transactionReducer({ 1: [initial] }, { type: 'ADD_TRANSACTION', payload: added });
        chai_1.expect(newState).to.deep.eq({ 1: [added, initial] });
    });
    it('update transactions', function () {
        var initialTransactions = [
            { transaction: { chainId: 1 }, submittedAt: 10 },
            { transaction: { chainId: 1 }, submittedAt: 15 },
            { transaction: { chainId: 1 }, submittedAt: 20 },
        ];
        var newTransactions = initialTransactions.map(function (tx) { return (__assign(__assign({}, tx), { lastCheckedBlockNumber: 12 })); });
        var newState = reducer_1.transactionReducer({ 1: initialTransactions }, { type: 'UPDATE_TRANSACTIONS', chainId: 1, transactions: newTransactions });
        chai_1.expect(newState).to.deep.eq({ 1: newTransactions });
    });
});
//# sourceMappingURL=transactionsReducer.test.js.map