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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.transactionReducer = void 0;
var constants_1 = require("../../constants");
function isChainId(chainId) {
    return Object.values(constants_1.ChainId).includes(chainId);
}
function transactionReducer(state, action) {
    var _a, _b;
    var _c;
    switch (action.type) {
        case 'ADD_TRANSACTION': {
            var chainId = action.payload.transaction.chainId;
            if (isChainId(chainId)) {
                return __assign(__assign({}, state), (_a = {}, _a[chainId] = __spreadArrays([action.payload], ((_c = state[chainId]) !== null && _c !== void 0 ? _c : [])), _a));
            }
            else {
                throw TypeError('Unsupported chain');
            }
        }
        case 'UPDATE_TRANSACTIONS':
            return __assign(__assign({}, state), (_b = {}, _b[action.chainId] = __spreadArrays(action.transactions), _b));
    }
}
exports.transactionReducer = transactionReducer;
//# sourceMappingURL=reducer.js.map