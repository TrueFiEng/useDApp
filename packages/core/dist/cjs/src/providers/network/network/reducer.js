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
exports.networksReducer = exports.defaultNetworkState = void 0;
exports.defaultNetworkState = {
    provider: undefined,
    chainId: undefined,
    accounts: [],
    errors: []
};
function networksReducer(prevState, actions) {
    switch (actions.type) {
        case 'UPDATE_NETWORK':
            return __assign(__assign({}, prevState), actions.network);
        case 'ADD_ERROR':
            return __assign(__assign({}, prevState), { errors: __spreadArray(__spreadArray([], prevState.errors, true), [actions.error], false) });
        default:
            return prevState;
    }
}
exports.networksReducer = networksReducer;
//# sourceMappingURL=reducer.js.map