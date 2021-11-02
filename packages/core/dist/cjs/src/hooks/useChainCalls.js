"use strict";
exports.__esModule = true;
exports.useChainCall = exports.useChainCalls = void 0;
var react_1 = require("react");
var context_1 = require("../providers/chainState/context");
function useChainCalls(calls) {
    var _a = react_1.useContext(context_1.ChainStateContext), dispatchCalls = _a.dispatchCalls, value = _a.value;
    react_1.useEffect(function () {
        var filteredCalls = calls.filter(Boolean);
        dispatchCalls({ type: 'ADD_CALLS', calls: filteredCalls });
        return function () { return dispatchCalls({ type: 'REMOVE_CALLS', calls: filteredCalls }); };
    }, [JSON.stringify(calls), dispatchCalls]);
    return react_1.useMemo(function () { return calls.map(function (call) { var _a, _b; return call && ((_b = (_a = value === null || value === void 0 ? void 0 : value.state) === null || _a === void 0 ? void 0 : _a[call.address]) === null || _b === void 0 ? void 0 : _b[call.data]); }); }, [
        JSON.stringify(calls),
        value,
    ]);
}
exports.useChainCalls = useChainCalls;
function useChainCall(call) {
    return useChainCalls([call])[0];
}
exports.useChainCall = useChainCall;
//# sourceMappingURL=useChainCalls.js.map