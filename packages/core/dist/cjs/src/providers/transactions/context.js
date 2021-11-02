"use strict";
exports.__esModule = true;
exports.useTransactionsContext = exports.TransactionsContext = void 0;
var react_1 = require("react");
var model_1 = require("./model");
exports.TransactionsContext = react_1.createContext({
    transactions: model_1.DEFAULT_STORED_TRANSACTIONS,
    addTransaction: function () { return undefined; }
});
function useTransactionsContext() {
    return react_1.useContext(exports.TransactionsContext);
}
exports.useTransactionsContext = useTransactionsContext;
//# sourceMappingURL=context.js.map