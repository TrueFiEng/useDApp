"use strict";
exports.__esModule = true;
exports.useMulticallAddress = void 0;
var react_1 = require("react");
var context_1 = require("../providers/chainState/context");
function useMulticallAddress() {
    return react_1.useContext(context_1.ChainStateContext).multicallAddress;
}
exports.useMulticallAddress = useMulticallAddress;
//# sourceMappingURL=useMulticallAddress.js.map