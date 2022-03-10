"use strict";
exports.__esModule = true;
exports.useBlockNumbers = exports.BlockNumbersContext = void 0;
var react_1 = require("react");
exports.BlockNumbersContext = (0, react_1.createContext)({});
function useBlockNumbers() {
    return (0, react_1.useContext)(exports.BlockNumbersContext);
}
exports.useBlockNumbers = useBlockNumbers;
//# sourceMappingURL=context.js.map