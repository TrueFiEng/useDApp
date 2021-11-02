"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.callsReducer = void 0;
function callsReducer(state, action) {
    if (state === void 0) { state = []; }
    if (action.type === 'ADD_CALLS') {
        return __spreadArrays(state, action.calls);
    }
    else {
        var finalState = state;
        var _loop_1 = function (call) {
            var index = finalState.findIndex(function (x) { return x.address === call.address && x.data === call.data; });
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