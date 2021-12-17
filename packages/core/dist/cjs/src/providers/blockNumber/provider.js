"use strict";
exports.__esModule = true;
exports.BlockNumberProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var context_1 = require("./context");
var reducer_1 = require("./reducer");
var hooks_1 = require("../../hooks");
function BlockNumberProvider(_a) {
    var children = _a.children;
    var _b = hooks_1.useEthers(), library = _b.library, chainId = _b.chainId;
    var _c = react_1.useReducer(reducer_1.blockNumberReducer, {}), state = _c[0], dispatch = _c[1];
    react_1.useEffect(function () {
        if (library && chainId !== undefined) {
            var update_1 = function (blockNumber) { return dispatch({ chainId: chainId, blockNumber: blockNumber }); };
            library.on('block', update_1);
            return function () {
                library.off('block', update_1);
            };
        }
    }, [library, chainId]);
    var debouncedState = hooks_1.useDebounce(state, 100);
    var blockNumber = chainId !== undefined ? debouncedState[chainId] : undefined;
    return jsx_runtime_1.jsx(context_1.BlockNumberContext.Provider, { value: blockNumber, children: children }, void 0);
}
exports.BlockNumberProvider = BlockNumberProvider;
//# sourceMappingURL=provider.js.map