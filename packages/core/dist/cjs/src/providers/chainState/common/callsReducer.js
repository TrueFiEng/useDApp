"use strict";
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
exports.callsReducer = void 0;
var __1 = require("../../..");
function callsReducer(state, action) {
    if (state === void 0) { state = []; }
    if (action.type === 'ADD_CALLS') {
        return __spreadArray(__spreadArray([], state, true), action.calls, true);
    }
    else {
        var finalState = state;
        var _loop_1 = function (call) {
            var index = finalState.findIndex(function (x) { return (0, __1.addressEqual)(x.address, call.address) && x.data === call.data; });
            if (index !== -1) {
                finalState = finalState.filter(function (_, i) { return i !== index; });
            }
        };
        for (var _i = 0, _a = action.calls; _i < _a.length; _i++) {
            var call = _a[_i];
            _loop_1(call);
        }
        return finalState;
    }
}
exports.callsReducer = callsReducer;
//# sourceMappingURL=callsReducer.js.map