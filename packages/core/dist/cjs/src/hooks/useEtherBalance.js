"use strict";
exports.__esModule = true;
exports.useEtherBalance = void 0;
var constants_1 = require("../constants");
var useMulticallAddress_1 = require("./useMulticallAddress");
var useContractCall_1 = require("./useContractCall");
function useEtherBalance(address, queryParams) {
    var _a;
    if (queryParams === void 0) { queryParams = {}; }
    var multicallAddress = (0, useMulticallAddress_1.useMulticallAddress)(queryParams);
    var etherBalance = ((_a = (0, useContractCall_1.useContractCall)(multicallAddress &&
        address && {
        abi: constants_1.MultiCallABI,
        address: multicallAddress,
        method: 'getEthBalance',
        args: [address]
    }, queryParams)) !== null && _a !== void 0 ? _a : [])[0];
    return etherBalance;
}
exports.useEtherBalance = useEtherBalance;
//# sourceMappingURL=useEtherBalance.js.map