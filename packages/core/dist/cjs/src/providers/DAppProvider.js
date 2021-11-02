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
exports.DAppProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var constants_1 = require("../constants");
var provider_1 = require("../providers/config/provider");
var provider_2 = require("./blockNumber/provider");
var chainState_1 = require("./chainState");
var context_1 = require("./config/context");
var EthersProvider_1 = require("./EthersProvider");
var provider_3 = require("./notifications/provider");
var NetworkActivator_1 = require("./NetworkActivator");
var provider_4 = require("./transactions/provider");
var LocalMulticallProvider_1 = require("./LocalMulticallProvider");
function DAppProvider(_a) {
    var config = _a.config, children = _a.children;
    return (jsx_runtime_1.jsx(provider_1.ConfigProvider, __assign({ config: config }, { children: jsx_runtime_1.jsx(DAppProviderWithConfig, { children: children }, void 0) }), void 0));
}
exports.DAppProvider = DAppProvider;
function DAppProviderWithConfig(_a) {
    var children = _a.children;
    var multicallAddresses = context_1.useConfig().multicallAddresses;
    var multicallAddressesMerged = __assign(__assign({}, constants_1.MULTICALL_ADDRESSES), multicallAddresses);
    return (jsx_runtime_1.jsx(EthersProvider_1.EthersProvider, { children: jsx_runtime_1.jsxs(provider_2.BlockNumberProvider, { children: [jsx_runtime_1.jsx(NetworkActivator_1.NetworkActivator, {}, void 0),
                jsx_runtime_1.jsx(LocalMulticallProvider_1.LocalMulticallProvider, { children: jsx_runtime_1.jsx(chainState_1.ChainStateProvider, __assign({ multicallAddresses: multicallAddressesMerged }, { children: jsx_runtime_1.jsx(provider_3.NotificationsProvider, { children: jsx_runtime_1.jsx(provider_4.TransactionProvider, { children: children }, void 0) }, void 0) }), void 0) }, void 0)] }, void 0) }, void 0));
}
//# sourceMappingURL=DAppProvider.js.map