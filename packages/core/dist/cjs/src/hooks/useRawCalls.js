"use strict";
exports.__esModule = true;
exports.useRawCall = exports.useRawCalls = void 0;
var react_1 = require("react");
var providers_1 = require("../providers");
var useEthers_1 = require("./useEthers");
function useRawCalls(calls) {
    var _a = (0, react_1.useContext)(providers_1.MultiChainStatesContext), dispatchCalls = _a.dispatchCalls, chains = _a.chains;
    var chainId = (0, useEthers_1.useEthers)().chainId;
    (0, react_1.useEffect)(function () {
        var filteredCalls = calls.filter(Boolean);
        dispatchCalls({ type: 'ADD_CALLS', calls: filteredCalls });
        return function () { return dispatchCalls({ type: 'REMOVE_CALLS', calls: filteredCalls }); };
    }, [JSON.stringify(calls), dispatchCalls]);
    return (0, react_1.useMemo)(function () {
        return calls.map(function (call) {
            return call ? extractCallResult(chains, call, chainId) : undefined;
        });
    }, [JSON.stringify(calls), chains]);
}
exports.useRawCalls = useRawCalls;
function useRawCall(call) {
    return useRawCalls([call])[0];
}
exports.useRawCall = useRawCall;
function extractCallResult(chains, call, defaultChainId) {
    var _a, _b, _c, _d, _e;
    var chainId = (_a = call.chainId) !== null && _a !== void 0 ? _a : defaultChainId;
    return chainId !== undefined ? (_e = (_d = (_c = (_b = chains[chainId]) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.state) === null || _d === void 0 ? void 0 : _d[call.address]) === null || _e === void 0 ? void 0 : _e[call.data] : undefined;
}
//# sourceMappingURL=useRawCalls.js.map