"use strict";
exports.__esModule = true;
exports.useDevtoolsReporting = void 0;
var react_1 = require("react");
var hooks_1 = require("../../hooks");
var devtools_1 = require("../devtools");
function useDevtoolsReporting(uniqueCallsJSON, uniqueCalls, blockNumber, multicallAddresses) {
    var _a = hooks_1.useEthers(), chainId = _a.chainId, account = _a.account, error = _a.error;
    var multicall = chainId !== undefined ? multicallAddresses[chainId] : undefined;
    react_1.useEffect(function () {
        devtools_1.notifyDevtools({ type: 'NETWORK_CHANGED', chainId: chainId, multicallAddress: multicall });
    }, [chainId, multicall]);
    react_1.useEffect(function () {
        devtools_1.notifyDevtools({ type: 'ACCOUNT_CHANGED', address: account !== null && account !== void 0 ? account : undefined });
    }, [account]);
    react_1.useEffect(function () {
        devtools_1.notifyDevtools({ type: 'CALLS_CHANGED', chainId: chainId, calls: uniqueCalls });
    }, [uniqueCallsJSON]);
    react_1.useEffect(function () {
        if (chainId !== undefined && blockNumber !== undefined) {
            devtools_1.notifyDevtools({ type: 'BLOCK_NUMBER_CHANGED', chainId: chainId, blockNumber: blockNumber });
        }
    }, [blockNumber, chainId]);
    react_1.useEffect(function () {
        if (error !== undefined) {
            devtools_1.notifyDevtools({ type: 'GENERIC_ERROR', error: error });
        }
    }, [error]);
}
exports.useDevtoolsReporting = useDevtoolsReporting;
//# sourceMappingURL=useDevtoolsReporting.js.map