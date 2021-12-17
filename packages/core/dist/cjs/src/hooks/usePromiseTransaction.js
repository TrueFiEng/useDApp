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
exports.usePromiseTransaction = void 0;
var react_1 = require("react");
var providers_1 = require("../providers");
var ethers_1 = require("ethers");
var isDroppedAndReplaced = function (e) {
    return (e === null || e === void 0 ? void 0 : e.code) === ethers_1.errors.TRANSACTION_REPLACED && (e === null || e === void 0 ? void 0 : e.replacement) && ((e === null || e === void 0 ? void 0 : e.reason) === 'repriced' || (e === null || e === void 0 ? void 0 : e.cancelled) === false);
};
function usePromiseTransaction(chainId, options) {
    var _this = this;
    var _a = react_1.useState({ status: 'None' }), state = _a[0], setState = _a[1];
    var addTransaction = providers_1.useTransactionsContext().addTransaction;
    var addNotification = providers_1.useNotificationsContext().addNotification;
    var promiseTransaction = react_1.useCallback(function (transactionPromise) { return __awaiter(_this, void 0, void 0, function () {
        var transaction, receipt, e_1, errorMessage, droppedAndReplaced, status_1, type;
        var _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    if (!chainId)
                        return [2 /*return*/];
                    transaction = undefined;
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, transactionPromise];
                case 2:
                    transaction = _g.sent();
                    setState({ transaction: transaction, status: 'Mining', chainId: chainId });
                    addTransaction({
                        transaction: __assign(__assign({}, transaction), { chainId: chainId }),
                        submittedAt: Date.now(),
                        transactionName: options === null || options === void 0 ? void 0 : options.transactionName
                    });
                    return [4 /*yield*/, transaction.wait()];
                case 3:
                    receipt = _g.sent();
                    setState({ receipt: receipt, transaction: transaction, status: 'Success', chainId: chainId });
                    return [2 /*return*/, receipt];
                case 4:
                    e_1 = _g.sent();
                    errorMessage = (_e = (_c = (_b = (_a = e_1.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : e_1.reason) !== null && _c !== void 0 ? _c : (_d = e_1.data) === null || _d === void 0 ? void 0 : _d.message) !== null && _e !== void 0 ? _e : e_1.message;
                    if (transaction) {
                        droppedAndReplaced = isDroppedAndReplaced(e_1);
                        if (droppedAndReplaced) {
                            status_1 = e_1.receipt.status === 0 ? 'Fail' : 'Success';
                            type = status_1 === 'Fail' ? 'transactionFailed' : 'transactionSucceed';
                            addNotification({
                                notification: {
                                    type: type,
                                    submittedAt: Date.now(),
                                    transaction: e_1.replacement,
                                    receipt: e_1.receipt,
                                    transactionName: (_f = e_1.replacement) === null || _f === void 0 ? void 0 : _f.transactionName,
                                    originalTransaction: transaction
                                },
                                chainId: chainId
                            });
                            setState({
                                status: status_1,
                                transaction: e_1.replacement,
                                originalTransaction: transaction,
                                receipt: e_1.receipt,
                                errorMessage: errorMessage,
                                chainId: chainId
                            });
                        }
                        else {
                            setState({ status: 'Fail', transaction: transaction, receipt: e_1.receipt, errorMessage: errorMessage, chainId: chainId });
                        }
                    }
                    else {
                        setState({ status: 'Exception', errorMessage: errorMessage, chainId: chainId });
                    }
                    return [2 /*return*/, undefined];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [chainId, setState, addTransaction, options]);
    return { promiseTransaction: promiseTransaction, state: state };
}
exports.usePromiseTransaction = usePromiseTransaction;
//# sourceMappingURL=usePromiseTransaction.js.map