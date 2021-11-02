"use strict";
exports.__esModule = true;
exports.useBlockMeta = void 0;
var constants_1 = require("../constants");
var bignumber_1 = require("@ethersproject/bignumber");
var useChainCalls_1 = require("./useChainCalls");
var useMulticallAddress_1 = require("./useMulticallAddress");
var GET_CURRENT_BLOCK_TIMESTAMP_CALL = constants_1.MultiCallABI.encodeFunctionData('getCurrentBlockTimestamp', []);
var GET_CURRENT_BLOCK_DIFFICULTY_CALL = constants_1.MultiCallABI.encodeFunctionData('getCurrentBlockDifficulty', []);
function useBlockMeta() {
    var address = useMulticallAddress_1.useMulticallAddress();
    var timestamp = useChainCalls_1.useChainCall(address && { address: address, data: GET_CURRENT_BLOCK_TIMESTAMP_CALL });
    var difficulty = useChainCalls_1.useChainCall(address && { address: address, data: GET_CURRENT_BLOCK_DIFFICULTY_CALL });
    return {
        timestamp: timestamp !== undefined ? new Date(bignumber_1.BigNumber.from(timestamp).mul(1000).toNumber()) : undefined,
        difficulty: difficulty !== undefined ? bignumber_1.BigNumber.from(difficulty) : undefined
    };
}
exports.useBlockMeta = useBlockMeta;
//# sourceMappingURL=useBlockMeta.js.map