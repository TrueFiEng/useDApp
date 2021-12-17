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
exports.chainStateReducer = void 0;
function chainStateReducer(state, action) {
    var _a, _b, _c;
    var _d, _e, _f;
    if (state === void 0) { state = {}; }
    var current = (_d = state[action.chainId]) === null || _d === void 0 ? void 0 : _d.blockNumber;
    if (!current || action.blockNumber >= current) {
        if (action.type === 'FETCH_SUCCESS') {
            var newState = action.state;
            if (action.blockNumber === current) {
                // merge with existing state to prevent requests coming out of order
                // from overwriting the data
                var oldState = (_f = (_e = state[action.chainId]) === null || _e === void 0 ? void 0 : _e.state) !== null && _f !== void 0 ? _f : {};
                for (var _i = 0, _g = Object.entries(oldState); _i < _g.length; _i++) {
                    var _h = _g[_i], address = _h[0], entries = _h[1];
                    newState = __assign(__assign({}, newState), (_a = {}, _a[address] = __assign(__assign({}, entries), newState[address]), _a));
                }
            }
            return __assign(__assign({}, state), (_b = {}, _b[action.chainId] = { blockNumber: action.blockNumber, state: newState }, _b));
        }
        else if (action.type === 'FETCH_ERROR') {
            return __assign(__assign({}, state), (_c = {}, _c[action.chainId] = __assign(__assign({}, state[action.chainId]), { blockNumber: action.blockNumber, error: action.error }), _c));
        }
    }
    return state;
}
exports.chainStateReducer = chainStateReducer;
//# sourceMappingURL=chainStateReducer.js.map