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
exports.useToken = void 0;
var constants_1 = require("../constants");
var useContractCall_1 = require("./useContractCall");
function useToken(tokenAddress) {
    var _a, _b;
    var partialCall = {
        abi: constants_1.ERC20Interface,
        address: tokenAddress || '',
        args: []
    };
    var args = ['name', 'symbol', 'decimals', 'totalSupply'].map(function (method) { return (__assign(__assign({}, partialCall), { method: method })); });
    var _c = useContractCall_1.useContractCalls(args), name = _c[0], symbol = _c[1], decimals = _c[2], totalSupply = _c[3];
    if (!name && !symbol && !decimals && !totalSupply) {
        return undefined;
    }
    return {
        name: (_a = name === null || name === void 0 ? void 0 : name[0]) !== null && _a !== void 0 ? _a : '',
        symbol: (_b = symbol === null || symbol === void 0 ? void 0 : symbol[0]) !== null && _b !== void 0 ? _b : '',
        decimals: decimals === null || decimals === void 0 ? void 0 : decimals[0],
        totalSupply: totalSupply === null || totalSupply === void 0 ? void 0 : totalSupply[0]
    };
}
exports.useToken = useToken;
//# sourceMappingURL=useToken.js.map