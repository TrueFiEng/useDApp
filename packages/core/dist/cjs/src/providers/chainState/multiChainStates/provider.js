"use strict";
exports.__esModule = true;
exports.MultiChainStateProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var hooks_1 = require("../../../hooks");
var context_1 = require("./context");
var __1 = require("../../..");
var network_1 = require("../../network");
var blockNumbers_1 = require("../../blockNumber/blockNumbers");
var fromEntries_1 = require("../../../helpers/fromEntries");
var performMulticall_1 = require("../common/performMulticall");
function composeChainState(networks, state, multicallAddresses) {
    return (0, fromEntries_1.fromEntries)(Object.keys(networks).map(function (chainId) { return [
        Number(chainId),
        {
            value: state[Number(chainId)],
            multicallAddress: multicallAddresses[Number(chainId)]
        },
    ]; }));
}
function MultiChainStateProvider(_a) {
    var children = _a.children, multicallAddresses = _a.multicallAddresses;
    var multicallVersion = (0, __1.useConfig)().multicallVersion;
    var networks = (0, network_1.useReadonlyNetworks)();
    var blockNumbers = (0, blockNumbers_1.useBlockNumbers)();
    var reportError = (0, __1.useNetwork)().reportError;
    var _b = (0, react_1.useReducer)(__1.callsReducer, []), calls = _b[0], dispatchCalls = _b[1];
    var _c = (0, react_1.useReducer)(__1.chainStateReducer, {}), state = _c[0], dispatchState = _c[1];
    var multicall = multicallVersion === 1 ? __1.multicall : __1.multicall2;
    var _d = (0, hooks_1.useDebouncePair)(calls, networks, 50), debouncedCalls = _d[0], debouncedNetworks = _d[1];
    var uniqueCalls = debouncedNetworks === networks ? (0, __1.getUniqueCalls)(debouncedCalls) : [];
    // used for deep equality in hook dependencies
    var uniqueCallsJSON = JSON.stringify(uniqueCalls);
    function multicallForChain(chainId, provider) {
        var blockNumber = blockNumbers[chainId];
        var multicallAddress = multicallAddresses[chainId];
        if (!provider || !blockNumber) {
            return;
        }
        if (!multicallAddress) {
            reportError(new Error("Missing multicall address for chain id ".concat(chainId)));
            return;
        }
        var callsOnThisChain = uniqueCalls.filter(function (call) { return call.chainId === chainId; });
        if (callsOnThisChain.length === 0) {
            return;
        }
        (0, performMulticall_1.performMulticall)(provider, multicall, multicallAddress, blockNumber, callsOnThisChain, dispatchState, chainId, reportError);
    }
    (0, react_1.useEffect)(function () {
        for (var _i = 0, _a = Object.entries(networks); _i < _a.length; _i++) {
            var _b = _a[_i], _chainId = _b[0], provider = _b[1];
            multicallForChain(Number(_chainId), provider);
        }
    }, [blockNumbers, networks, multicallAddresses, uniqueCallsJSON]);
    var chains = (0, react_1.useMemo)(function () { return composeChainState(networks, state, multicallAddresses); }, [
        state,
        multicallAddresses,
        networks,
    ]);
    var provided = { chains: chains, dispatchCalls: dispatchCalls };
    return (0, jsx_runtime_1.jsx)(context_1.MultiChainStatesContext.Provider, { value: provided, children: children });
}
exports.MultiChainStateProvider = MultiChainStateProvider;
//# sourceMappingURL=provider.js.map