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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.transactionReducer = void 0;
function transactionReducer(state, action) {
    var _a, _b;
    var _c;
    switch (action.type) {
        case 'ADD_TRANSACTION': {
            var chainId = action.payload.transaction.chainId;
            return __assign(__assign({}, state), (_a = {}, _a[chainId] = __spreadArray([action.payload], ((_c = state[chainId]) !== null && _c !== void 0 ? _c : []), true), _a));
        }
        case 'UPDATE_TRANSACTIONS':
            return __assign(__assign({}, state), (_b = {}, _b[action.chainId] = __spreadArray([], action.transactions, true), _b));
    }
}
exports.transactionReducer = transactionReducer;
//# sourceMappingURL=reducer.js.map