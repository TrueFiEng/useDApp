"use strict";
exports.__esModule = true;
exports.useTokenAllowance = void 0;
var constants_1 = require("../constants");
var useContractCall_1 = require("./useContractCall");
function useTokenAllowance(tokenAddress, ownerAddress, spenderAddress) {
    var _a;
    var allowance = ((_a = useContractCall_1.useContractCall(ownerAddress &&
        spenderAddress &&
        tokenAddress && {
        abi: constants_1.ERC20Interface,
        address: tokenAddress,
        method: 'allowance',
        args: [ownerAddress, spenderAddress]
    })) !== null && _a !== void 0 ? _a : [])[0];
    return allowance;
}
exports.useTokenAllowance = useTokenAllowance;
//# sourceMappingURL=useTokenAllowance.js.map