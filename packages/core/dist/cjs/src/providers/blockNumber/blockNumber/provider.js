"use strict";
exports.__esModule = true;
exports.BlockNumberProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var context_1 = require("./context");
var reducer_1 = require("../common/reducer");
var hooks_1 = require("../../../hooks");
var subscribeToNewBlock_1 = require("../common/subscribeToNewBlock");
function BlockNumberProvider(_a) {
    var children = _a.children;
    var _b = (0, hooks_1.useEthers)(), library = _b.library, chainId = _b.chainId;
    var _c = (0, react_1.useReducer)(reducer_1.blockNumberReducer, {}), state = _c[0], dispatch = _c[1];
    (0, react_1.useEffect)(function () { return (0, subscribeToNewBlock_1.subscribeToNewBlock)(library, chainId, dispatch); }, [library, chainId]);
    var debouncedState = (0, hooks_1.useDebounce)(state, 100);
    var blockNumber = chainId !== undefined ? debouncedState[chainId] : undefined;
    return (0, jsx_runtime_1.jsx)(context_1.BlockNumberContext.Provider, { value: blockNumber, children: children });
}
exports.BlockNumberProvider = BlockNumberProvider;
//# sourceMappingURL=provider.js.map