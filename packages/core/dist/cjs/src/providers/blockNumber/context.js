"use strict";
exports.__esModule = true;
exports.useBlockNumber = exports.BlockNumberContext = void 0;
var react_1 = require("react");
exports.BlockNumberContext = react_1.createContext(undefined);
function useBlockNumber() {
    return react_1.useContext(exports.BlockNumberContext);
}
exports.useBlockNumber = useBlockNumber;
//# sourceMappingURL=context.js.map