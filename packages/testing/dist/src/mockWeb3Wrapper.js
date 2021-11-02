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
exports.MockWeb3Wrapper = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var core_1 = require("@web3-react/core");
var react_1 = require("react");
var core_2 = require("@usedapp/core");
var mockConnector_1 = require("./mockConnector");
var WrapperActivation = function (_a) {
    var children = _a.children, connector = _a.connector;
    var _b = core_2.useEthers(), activate = _b.activate, active = _b.active;
    react_1.useEffect(function () {
        activate(connector !== null && connector !== void 0 ? connector : new mockConnector_1.MockConnector(), console.error);
    }, []);
    if (!active)
        return null;
    return jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: children }, void 0);
};
var MockWeb3Wrapper = function (_a) {
    var children = _a.children, connector = _a.connector;
    return (jsx_runtime_1.jsx(core_1.Web3ReactProvider, __assign({ getLibrary: function (provider) { return provider; } }, { children: jsx_runtime_1.jsx(WrapperActivation, __assign({ connector: connector }, { children: children }), void 0) }), void 0));
};
exports.MockWeb3Wrapper = MockWeb3Wrapper;
//# sourceMappingURL=mockWeb3Wrapper.js.map