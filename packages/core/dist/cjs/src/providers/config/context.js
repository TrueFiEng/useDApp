"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.useUpdateConfig = exports.useConfig = exports.ConfigContext = void 0;
var react_1 = require("react");
var default_1 = require("../../model/config/default");
var chain_1 = require("../../helpers/chain");
exports.ConfigContext = react_1.createContext({
    config: default_1.DEFAULT_CONFIG,
    updateConfig: function () { return undefined; }
});
var validConfigs = function (configs) {
    if (!(configs === null || configs === void 0 ? void 0 : configs.networks) || (configs === null || configs === void 0 ? void 0 : configs.networks.length) === 0) {
        console.warn('No networks or supportedChain configured');
    }
    return configs;
};
function useConfig() {
    var _a;
    var config = react_1.useContext(exports.ConfigContext).config;
    // backward compatible with supportedChains
    if (config.supportedChains) {
        console.warn('supportedChain is deprecated, please pass networks instead');
        var networks = (_a = config.supportedChains) === null || _a === void 0 ? void 0 : _a.map(function (chainId) { return chain_1.getChainById(chainId); });
        return validConfigs(__assign(__assign({}, config), { networks: networks }));
    }
    return validConfigs(config);
}
exports.useConfig = useConfig;
function useUpdateConfig() {
    var updateConfig = react_1.useContext(exports.ConfigContext).updateConfig;
    return updateConfig;
}
exports.useUpdateConfig = useUpdateConfig;
//# sourceMappingURL=context.js.map