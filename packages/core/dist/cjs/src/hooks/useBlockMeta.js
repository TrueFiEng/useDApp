"use strict";
exports.__esModule = true;
exports.useBlockMeta = void 0;
var constants_1 = require("../constants");
var bignumber_1 = require("@ethersproject/bignumber");
var useMulticallAddress_1 = require("./useMulticallAddress");
var providers_1 = require("../providers");
var useRawCalls_1 = require("./useRawCalls");
var GET_CURRENT_BLOCK_TIMESTAMP_CALL = constants_1.MultiCallABI.encodeFunctionData('getCurrentBlockTimestamp', []);
var GET_CURRENT_BLOCK_DIFFICULTY_CALL = constants_1.MultiCallABI.encodeFunctionData('getCurrentBlockDifficulty', []);
function useBlockMeta(queryParams) {
    var _a;
    if (queryParams === void 0) { queryParams = {}; }
    var network = (0, providers_1.useNetwork)().network;
    var chainId = (_a = queryParams.chainId) !== null && _a !== void 0 ? _a : network.chainId;
    var address = (0, useMulticallAddress_1.useMulticallAddress)(queryParams);
    var timestamp = (0, useRawCalls_1.useRawCall)(address && chainId !== undefined && { address: address, data: GET_CURRENT_BLOCK_TIMESTAMP_CALL, chainId: chainId });
    var difficulty = (0, useRawCalls_1.useRawCall)(address && chainId !== undefined && { address: address, data: GET_CURRENT_BLOCK_DIFFICULTY_CALL, chainId: chainId });
    return {
        timestamp: timestamp !== undefined ? new Date(bignumber_1.BigNumber.from(timestamp.value).mul(1000).toNumber()) : undefined,
        difficulty: difficulty !== undefined ? bignumber_1.BigNumber.from(difficulty.value) : undefined
    };
}
exports.useBlockMeta = useBlockMeta;
//# sourceMappingURL=useBlockMeta.js.map