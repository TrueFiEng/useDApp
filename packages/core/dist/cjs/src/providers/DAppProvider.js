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
var react_1 = require("react");
var config_1 = require("./config");
var blockNumber_1 = require("./blockNumber/blockNumber");
var chainState_1 = require("./chainState");
var context_1 = require("./config/context");
var provider_1 = require("./notifications/provider");
var NetworkActivator_1 = require("./NetworkActivator");
var provider_2 = require("./transactions/provider");
var LocalMulticallProvider_1 = require("./LocalMulticallProvider");
var network_1 = require("./network");
var blockNumbers_1 = require("./blockNumber/blockNumbers");
function DAppProvider(_a) {
    var config = _a.config, children = _a.children;
    return ((0, jsx_runtime_1.jsx)(config_1.ConfigProvider, __assign({ config: config }, { children: (0, jsx_runtime_1.jsx)(DAppProviderWithConfig, { children: children }) })));
}
exports.DAppProvider = DAppProvider;
var getMulticallAddresses = function (networks) {
    var result = {};
    networks === null || networks === void 0 ? void 0 : networks.forEach(function (network) { return (result[network.chainId] = network.multicallAddress); });
    return result;
};
var getMulticall2Addresses = function (networks) {
    var result = {};
    networks === null || networks === void 0 ? void 0 : networks.forEach(function (network) {
        if (network.multicall2Address) {
            result[network.chainId] = network.multicall2Address;
        }
    });
    return result;
};
function DAppProviderWithConfig(_a) {
    var children = _a.children;
    var _b = (0, context_1.useConfig)(), multicallAddresses = _b.multicallAddresses, networks = _b.networks, multicallVersion = _b.multicallVersion;
    var defaultAddresses = (0, react_1.useMemo)(function () { return (multicallVersion === 1 ? getMulticallAddresses(networks) : getMulticall2Addresses(networks)); }, [networks, multicallVersion]);
    var multicallAddressesMerged = __assign(__assign({}, defaultAddresses), multicallAddresses);
    return ((0, jsx_runtime_1.jsx)(network_1.ReadonlyNetworksProvider, { children: (0, jsx_runtime_1.jsx)(network_1.NetworkProvider, { children: (0, jsx_runtime_1.jsx)(network_1.InjectedNetworkProvider, { children: (0, jsx_runtime_1.jsx)(blockNumber_1.BlockNumberProvider, { children: (0, jsx_runtime_1.jsxs)(blockNumbers_1.BlockNumbersProvider, { children: [(0, jsx_runtime_1.jsx)(NetworkActivator_1.NetworkActivator, {}), (0, jsx_runtime_1.jsx)(LocalMulticallProvider_1.LocalMulticallProvider, { children: (0, jsx_runtime_1.jsx)(chainState_1.MultiChainStateProvider, __assign({ multicallAddresses: multicallAddressesMerged }, { children: (0, jsx_runtime_1.jsx)(provider_1.NotificationsProvider, { children: (0, jsx_runtime_1.jsx)(provider_2.TransactionProvider, { children: children }) }) })) })] }) }) }) }) }));
}
//# sourceMappingURL=DAppProvider.js.map