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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.TransactionProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var hooks_1 = require("../../hooks");
var blockNumber_1 = require("../blockNumber");
var context_1 = require("../notifications/context");
var context_2 = require("./context");
var model_1 = require("./model");
var reducer_1 = require("./reducer");
var config_1 = require("../config");
function TransactionProvider(_a) {
    var _this = this;
    var children = _a.children;
    var _b = hooks_1.useEthers(), chainId = _b.chainId, library = _b.library;
    var blockNumber = blockNumber_1.useBlockNumber();
    var localStorage = config_1.useConfig().localStorage;
    var _c = hooks_1.useLocalStorage(localStorage.transactionPath), storage = _c[0], setStorage = _c[1];
    var _d = react_1.useReducer(reducer_1.transactionReducer, storage !== null && storage !== void 0 ? storage : model_1.DEFAULT_STORED_TRANSACTIONS), transactions = _d[0], dispatch = _d[1];
    var addNotification = context_1.useNotificationsContext().addNotification;
    react_1.useEffect(function () {
        setStorage(transactions);
    }, [transactions]);
    var addTransaction = react_1.useCallback(function (payload) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: payload
        });
        addNotification({
            notification: {
                type: 'transactionStarted',
                transaction: payload.transaction,
                submittedAt: payload.submittedAt,
                transactionName: payload.transactionName
            },
            chainId: payload.transaction.chainId
        });
    }, [dispatch]);
    react_1.useEffect(function () {
        var updateTransactions = function () { return __awaiter(_this, void 0, void 0, function () {
            var checkTransaction, chainTransactions, newTransactions, _i, chainTransactions_1, tx, newTransaction;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!chainId || !library || !blockNumber) {
                            return [2 /*return*/];
                        }
                        checkTransaction = function (tx) { return __awaiter(_this, void 0, void 0, function () {
                            var receipt, type, error_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (tx.receipt || !shouldCheck(blockNumber, tx)) {
                                            return [2 /*return*/, tx];
                                        }
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, library.getTransactionReceipt(tx.transaction.hash)];
                                    case 2:
                                        receipt = _a.sent();
                                        if (receipt) {
                                            type = receipt.status === 0 ? 'transactionFailed' : 'transactionSucceed';
                                            addNotification({
                                                notification: {
                                                    type: type,
                                                    submittedAt: Date.now(),
                                                    transaction: tx.transaction,
                                                    receipt: receipt,
                                                    transactionName: tx.transactionName
                                                },
                                                chainId: chainId
                                            });
                                            return [2 /*return*/, __assign(__assign({}, tx), { receipt: receipt })];
                                        }
                                        else {
                                            return [2 /*return*/, __assign(__assign({}, tx), { lastCheckedBlockNumber: blockNumber })];
                                        }
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_1 = _a.sent();
                                        console.error("failed to check transaction hash: " + tx.transaction.hash, error_1);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/, tx];
                                }
                            });
                        }); };
                        chainTransactions = (_a = transactions[chainId]) !== null && _a !== void 0 ? _a : [];
                        newTransactions = [];
                        _i = 0, chainTransactions_1 = chainTransactions;
                        _b.label = 1;
                    case 1:
                        if (!(_i < chainTransactions_1.length)) return [3 /*break*/, 4];
                        tx = chainTransactions_1[_i];
                        return [4 /*yield*/, checkTransaction(tx)];
                    case 2:
                        newTransaction = _b.sent();
                        newTransactions.push(newTransaction);
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        dispatch({ type: 'UPDATE_TRANSACTIONS', chainId: chainId, transactions: newTransactions });
                        return [2 /*return*/];
                }
            });
        }); };
        updateTransactions();
    }, [chainId, library, blockNumber]);
    return jsx_runtime_1.jsx(context_2.TransactionsContext.Provider, { value: { transactions: transactions, addTransaction: addTransaction }, children: children }, void 0);
}
exports.TransactionProvider = TransactionProvider;
function shouldCheck(blockNumber, tx) {
    if (tx.receipt) {
        return false;
    }
    if (!tx.lastCheckedBlockNumber) {
        return true;
    }
    var blocksSinceCheck = blockNumber - tx.lastCheckedBlockNumber;
    if (blocksSinceCheck < 1) {
        return false;
    }
    var minutesPending = (Date.now() - tx.submittedAt) / 1000 / 60;
    if (minutesPending > 60) {
        // every 10 blocks if pending for longer than an hour
        return blocksSinceCheck > 9;
    }
    if (minutesPending > 5) {
        // every 3 blocks if pending more than 5 minutes
        return blocksSinceCheck > 2;
    }
    // otherwise every block
    return true;
}
//# sourceMappingURL=provider.js.map