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
exports.ReadonlyNetworksProvider = exports.getProvidersFromConfig = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var providers_1 = require("@ethersproject/providers");
var config_1 = require("../../config");
var context_1 = require("./context");
var fromEntries_1 = require("../../../helpers/fromEntries");
var getProvidersFromConfig = function (readOnlyUrls) {
    return (0, fromEntries_1.fromEntries)(Object.entries(readOnlyUrls).map(function (_a) {
        var chainId = _a[0], url = _a[1];
        return [chainId, new providers_1.JsonRpcProvider(url)];
    }));
};
exports.getProvidersFromConfig = getProvidersFromConfig;
function ReadonlyNetworksProvider(_a) {
    var _b = _a.providerOverrides, providerOverrides = _b === void 0 ? {} : _b, children = _a.children;
    var _c = (0, config_1.useConfig)().readOnlyUrls, readOnlyUrls = _c === void 0 ? {} : _c;
    var _d = (0, react_1.useState)(function () { return (__assign(__assign({}, (0, exports.getProvidersFromConfig)(readOnlyUrls)), providerOverrides)); }), providers = _d[0], setProviders = _d[1];
    (0, react_1.useEffect)(function () {
        setProviders(__assign(__assign({}, (0, exports.getProvidersFromConfig)(readOnlyUrls)), providerOverrides));
    }, [JSON.stringify(readOnlyUrls)]);
    return (0, jsx_runtime_1.jsx)(context_1.ReadonlyNetworksContext.Provider, __assign({ value: providers }, { children: children }));
}
exports.ReadonlyNetworksProvider = ReadonlyNetworksProvider;
//# sourceMappingURL=provider.js.map