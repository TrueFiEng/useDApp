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
exports.useChainState = void 0;
var react_1 = require("react");
var providers_1 = require("../providers");
function useChainState(queryParams) {
    var _a;
    if (queryParams === void 0) { queryParams = {}; }
    var multiChainState = (0, react_1.useContext)(providers_1.MultiChainStatesContext);
    var network = (0, providers_1.useNetwork)().network;
    var chainId = (_a = queryParams.chainId) !== null && _a !== void 0 ? _a : network.chainId;
    if (chainId === undefined) {
        return undefined;
    }
    return __assign(__assign({}, multiChainState.chains[chainId]), { dispatchCalls: multiChainState.dispatchCalls });
}
exports.useChainState = useChainState;
//# sourceMappingURL=useChainState.js.map