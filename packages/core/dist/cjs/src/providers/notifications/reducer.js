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
exports.notificationReducer = void 0;
function notificationReducer(state, action) {
    var _a, _b;
    var _c;
    var chainId = action.chainId;
    var chainState = (_c = state[chainId]) !== null && _c !== void 0 ? _c : [];
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            return __assign(__assign({}, state), (_a = {}, _a[chainId] = __spreadArrays([action.notification], chainState), _a));
        case 'REMOVE_NOTIFICATION': {
            return __assign(__assign({}, state), (_b = {}, _b[chainId] = chainState.filter(function (notification) { return notification.id !== action.notificationId; }), _b));
        }
    }
}
exports.notificationReducer = notificationReducer;
//# sourceMappingURL=reducer.js.map