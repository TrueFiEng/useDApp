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
exports.blockNumberReducer = void 0;
function blockNumberReducer(state, action) {
    var _a;
    if (state === void 0) { state = {}; }
    var current = state[action.chainId];
    if (!current || action.blockNumber > current) {
        return __assign(__assign({}, state), (_a = {}, _a[action.chainId] = action.blockNumber, _a));
    }
    return state;
}
exports.blockNumberReducer = blockNumberReducer;
//# sourceMappingURL=reducer.js.map