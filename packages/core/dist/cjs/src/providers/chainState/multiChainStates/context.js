"use strict";
exports.__esModule = true;
exports.useMultiChainStates = exports.MultiChainStatesContext = void 0;
var react_1 = require("react");
exports.MultiChainStatesContext = (0, react_1.createContext)({
    chains: {},
    dispatchCalls: function () { return undefined; }
});
function useMultiChainStates() {
    return (0, react_1.useContext)(exports.MultiChainStatesContext);
}
exports.useMultiChainStates = useMultiChainStates;
//# sourceMappingURL=context.js.map