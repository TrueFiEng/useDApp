"use strict";
exports.__esModule = true;
exports.useTokenAllowance = void 0;
var constants_1 = require("../constants");
var useContractCall_1 = require("./useContractCall");
function useTokenAllowance(tokenAddress, ownerAddress, spenderAddress, queryParams) {
    var _a;
    if (queryParams === void 0) { queryParams = {}; }
    var allowance = ((_a = (0, useContractCall_1.useContractCall)(ownerAddress &&
        spenderAddress &&
        tokenAddress && {
        abi: constants_1.ERC20Interface,
        address: tokenAddress,
        method: 'allowance',
        args: [ownerAddress, spenderAddress]
    }, queryParams)) !== null && _a !== void 0 ? _a : [])[0];
    return allowance;
}
exports.useTokenAllowance = useTokenAllowance;
//# sourceMappingURL=useTokenAllowance.js.map