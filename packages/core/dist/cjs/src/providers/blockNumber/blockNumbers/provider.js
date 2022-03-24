"use strict";
exports.__esModule = true;
exports.BlockNumbersProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var hooks_1 = require("../../../hooks");
var network_1 = require("../../network");
var context_1 = require("./context");
var reducer_1 = require("../common/reducer");
var subscribeToNewBlock_1 = require("../common/subscribeToNewBlock");
function BlockNumbersProvider(_a) {
    var children = _a.children;
    var networks = (0, network_1.useReadonlyNetworks)();
    var _b = (0, react_1.useReducer)(reducer_1.blockNumberReducer, {}), state = _b[0], dispatch = _b[1];
    (0, react_1.useEffect)(function () {
        var onUnmount = Object.entries(networks).map(function (_a) {
            var chainId = _a[0], provider = _a[1];
            return (0, subscribeToNewBlock_1.subscribeToNewBlock)(provider, Number(chainId), dispatch);
        });
        return function () {
            onUnmount.forEach(function (fn) { return fn(); });
        };
    }, [networks]);
    var debouncedState = (0, hooks_1.useDebounce)(state, 100);
    return (0, jsx_runtime_1.jsx)(context_1.BlockNumbersContext.Provider, { value: debouncedState, children: children });
}
exports.BlockNumbersProvider = BlockNumbersProvider;
//# sourceMappingURL=provider.js.map