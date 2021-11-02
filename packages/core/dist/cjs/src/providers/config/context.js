"use strict";
exports.__esModule = true;
exports.useUpdateConfig = exports.useConfig = exports.ConfigContext = void 0;
var react_1 = require("react");
var default_1 = require("../../model/config/default");
exports.ConfigContext = react_1.createContext({
    config: default_1.DEFAULT_CONFIG,
    updateConfig: function () { return undefined; }
});
function useConfig() {
    var config = react_1.useContext(exports.ConfigContext).config;
    return config;
}
exports.useConfig = useConfig;
function useUpdateConfig() {
    var updateConfig = react_1.useContext(exports.ConfigContext).updateConfig;
    return updateConfig;
}
exports.useUpdateConfig = useUpdateConfig;
//# sourceMappingURL=context.js.map