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
exports.EthersProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var providers_1 = require("@ethersproject/providers");
var core_1 = require("@web3-react/core");
var DEFAULT_POLLING_INTERVAL = 15000;
function EthersProvider(_a) {
    var children = _a.children, pollingInterval = _a.pollingInterval;
    function getLibrary(provider) {
        var library = new providers_1.Web3Provider(provider, 'any');
        library.pollingInterval = pollingInterval || DEFAULT_POLLING_INTERVAL;
        return library;
    }
    return jsx_runtime_1.jsx(core_1.Web3ReactProvider, __assign({ getLibrary: getLibrary }, { children: children }), void 0);
}
exports.EthersProvider = EthersProvider;
//# sourceMappingURL=EthersProvider.js.map