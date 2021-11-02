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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.renderWeb3Hook = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var provider_1 = require("@ethereum-waffle/provider");
var react_hooks_1 = require("@testing-library/react-hooks");
var core_1 = require("@usedapp/core");
var mockConnector_1 = require("./mockConnector");
var mockWeb3Wrapper_1 = require("./mockWeb3Wrapper");
var utils_1 = require("./utils");
var renderWeb3Hook = function (hook, options) { return __awaiter(void 0, void 0, void 0, function () {
    var provider, connector, multicallAddresses, UserWrapper, _a, result, waitForNextUpdate, rerender, unmount;
    var _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                provider = (options === null || options === void 0 ? void 0 : options.mockProvider) || new provider_1.MockProvider();
                provider.pollingInterval = (_c = (_b = options === null || options === void 0 ? void 0 : options.mockProviderOptions) === null || _b === void 0 ? void 0 : _b.pollingInterval) !== null && _c !== void 0 ? _c : 200;
                connector = new mockConnector_1.MockConnector(provider);
                return [4 /*yield*/, utils_1.deployMulticall(provider, connector)
                    // In some occasions the block number lags behind.
                    // It leads to a situation where we try to read state of a block before the multicall contract is deployed,
                    // and it results in a failed call. So we force the provider to catch up on the block number here.
                ];
            case 1:
                multicallAddresses = _g.sent();
                // In some occasions the block number lags behind.
                // It leads to a situation where we try to read state of a block before the multicall contract is deployed,
                // and it results in a failed call. So we force the provider to catch up on the block number here.
                return [4 /*yield*/, provider.getBlockNumber()];
            case 2:
                // In some occasions the block number lags behind.
                // It leads to a situation where we try to read state of a block before the multicall contract is deployed,
                // and it results in a failed call. So we force the provider to catch up on the block number here.
                _g.sent();
                UserWrapper = (_e = (_d = options === null || options === void 0 ? void 0 : options.renderHook) === null || _d === void 0 ? void 0 : _d.wrapper) !== null && _e !== void 0 ? _e : utils_1.IdentityWrapper;
                _a = react_hooks_1.renderHook(hook, {
                    wrapper: function (wrapperProps) { return (jsx_runtime_1.jsx(mockWeb3Wrapper_1.MockWeb3Wrapper, __assign({ connector: connector }, { children: jsx_runtime_1.jsx(core_1.BlockNumberProvider, { children: jsx_runtime_1.jsx(core_1.ChainStateProvider, __assign({ multicallAddresses: multicallAddresses }, { children: jsx_runtime_1.jsx(UserWrapper, __assign({}, wrapperProps), void 0) }), void 0) }, void 0) }), void 0)); },
                    initialProps: (_f = options === null || options === void 0 ? void 0 : options.renderHook) === null || _f === void 0 ? void 0 : _f.initialProps
                }), result = _a.result, waitForNextUpdate = _a.waitForNextUpdate, rerender = _a.rerender, unmount = _a.unmount;
                // we wait for the first update, before that the current is always undefined.
                // after this, we get the actual first return value of the hook (which might happen to be undefined anyway)
                return [4 /*yield*/, waitForNextUpdate()];
            case 3:
                // we wait for the first update, before that the current is always undefined.
                // after this, we get the actual first return value of the hook (which might happen to be undefined anyway)
                _g.sent();
                return [2 /*return*/, __assign({ result: result,
                        provider: provider, mineBlock: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, utils_1.mineBlock(provider)];
                        }); }); }, rerender: rerender,
                        unmount: unmount }, utils_1.getWaitUtils(result))];
        }
    });
}); };
exports.renderWeb3Hook = renderWeb3Hook;
//# sourceMappingURL=renderWeb3Hook.js.map