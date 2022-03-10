"use strict";
exports.__esModule = true;
exports.useDevtoolsReporting = void 0;
var react_1 = require("react");
var hooks_1 = require("../../../hooks");
var devtools_1 = require("../../devtools");
function useDevtoolsReporting(uniqueCallsJSON, uniqueCalls, blockNumber, multicallAddresses) {
    var _a = (0, hooks_1.useEthers)(), chainId = _a.chainId, account = _a.account, error = _a.error;
    var multicall = chainId !== undefined ? multicallAddresses[chainId] : undefined;
    (0, react_1.useEffect)(function () {
        (0, devtools_1.notifyDevtools)({ type: 'NETWORK_CHANGED', chainId: chainId, multicallAddress: multicall });
    }, [chainId, multicall]);
    (0, react_1.useEffect)(function () {
        (0, devtools_1.notifyDevtools)({ type: 'ACCOUNT_CHANGED', address: account !== null && account !== void 0 ? account : undefined });
    }, [account]);
    (0, react_1.useEffect)(function () {
        (0, devtools_1.notifyDevtools)({ type: 'CALLS_CHANGED', chainId: chainId, calls: uniqueCalls });
    }, [uniqueCallsJSON]);
    (0, react_1.useEffect)(function () {
        if (chainId !== undefined && blockNumber !== undefined) {
            (0, devtools_1.notifyDevtools)({ type: 'BLOCK_NUMBER_CHANGED', chainId: chainId, blockNumber: blockNumber });
        }
    }, [blockNumber, chainId]);
    (0, react_1.useEffect)(function () {
        if (error !== undefined) {
            (0, devtools_1.notifyDevtools)({ type: 'GENERIC_ERROR', error: error });
        }
    }, [error]);
}
exports.useDevtoolsReporting = useDevtoolsReporting;
//# sourceMappingURL=useDevtoolsReporting.js.map