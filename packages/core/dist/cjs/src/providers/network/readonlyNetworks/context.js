"use strict";
exports.__esModule = true;
exports.useReadonlyNetworks = exports.ReadonlyNetworksContext = void 0;
var react_1 = require("react");
exports.ReadonlyNetworksContext = (0, react_1.createContext)({});
function useReadonlyNetworks() {
    return (0, react_1.useContext)(exports.ReadonlyNetworksContext);
}
exports.useReadonlyNetworks = useReadonlyNetworks;
//# sourceMappingURL=context.js.map