"use strict";
exports.__esModule = true;
exports.useChainMeta = void 0;
var react_1 = require("react");
var getChainMeta_1 = require("../helpers/getChainMeta");
function useChainMeta(chainId) {
    return (0, react_1.useMemo)(function () { return (0, getChainMeta_1.getChainMeta)(chainId); }, [chainId]);
}
exports.useChainMeta = useChainMeta;
//# sourceMappingURL=useChainMeta.js.map