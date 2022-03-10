"use strict";
exports.__esModule = true;
exports.useMulticallAddress = void 0;
var useChainState_1 = require("./useChainState");
function useMulticallAddress(queryParams) {
    var _a;
    if (queryParams === void 0) { queryParams = {}; }
    return (_a = (0, useChainState_1.useChainState)(queryParams)) === null || _a === void 0 ? void 0 : _a.multicallAddress;
}
exports.useMulticallAddress = useMulticallAddress;
//# sourceMappingURL=useMulticallAddress.js.map