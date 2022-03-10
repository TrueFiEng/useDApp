"use strict";
exports.__esModule = true;
exports.NetworkActivator = void 0;
var react_1 = require("react");
var hooks_1 = require("../hooks");
var config_1 = require("./config");
var providers_1 = require("@ethersproject/providers");
var injectedNetwork_1 = require("./network/injectedNetwork");
function NetworkActivator(_a) {
    var providerOverride = _a.providerOverride;
    var _b = (0, hooks_1.useEthers)(), activate = _b.activate, activateBrowserWallet = _b.activateBrowserWallet, connectedChainId = _b.chainId;
    var _c = (0, config_1.useConfig)(), readOnlyChainId = _c.readOnlyChainId, readOnlyUrls = _c.readOnlyUrls, autoConnect = _c.autoConnect, pollingInterval = _c.pollingInterval;
    var injectedProvider = (0, injectedNetwork_1.useInjectedNetwork)();
    var shouldConnectMetamask = (0, hooks_1.useLocalStorage)('shouldConnectMetamask')[0];
    var _d = (0, react_1.useState)(false), readonlyConnected = _d[0], setReadonlyConnected = _d[1];
    (0, react_1.useEffect)(function () {
        if (providerOverride) {
            activate(providerOverride);
        }
    }, [providerOverride]);
    (0, react_1.useEffect)(function () {
        if (readOnlyChainId && readOnlyUrls && !providerOverride) {
            if (readOnlyUrls[readOnlyChainId] && connectedChainId !== readOnlyChainId) {
                var provider = new providers_1.JsonRpcProvider(readOnlyUrls[readOnlyChainId]);
                provider.pollingInterval = pollingInterval;
                activate(provider).then(function () { return setReadonlyConnected(true); });
            }
        }
    }, [readOnlyChainId, readOnlyUrls]);
    (0, react_1.useEffect)(function () {
        shouldConnectMetamask &&
            autoConnect &&
            injectedProvider &&
            !providerOverride &&
            readonlyConnected &&
            activateBrowserWallet();
    }, [readonlyConnected]);
    return null;
}
exports.NetworkActivator = NetworkActivator;
//# sourceMappingURL=NetworkActivator.js.map