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
var jsx_runtime_1 = require("react/jsx-runtime");
var chai_1 = require("chai");
var src_1 = require("../../src");
var testing_1 = require("../../src/testing");
describe('useConfig', function () {
    it('default', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, result, waitForCurrent;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, testing_1.renderWeb3Hook)(src_1.useConfig, {
                        renderHook: {
                            wrapper: function (_a) {
                                var children = _a.children;
                                return (0, jsx_runtime_1.jsx)(src_1.ConfigProvider, __assign({ config: {} }, { children: children }));
                            }
                        }
                    })];
                case 1:
                    _a = _b.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent;
                    return [4 /*yield*/, waitForCurrent(function (val) { return val != undefined; })];
                case 2:
                    _b.sent();
                    (0, chai_1.expect)(result.current['pollingInterval']).to.eq(15000);
                    return [2 /*return*/];
            }
        });
    }); });
    it('custom value', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, result, waitForCurrent;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, testing_1.renderWeb3Hook)(src_1.useConfig, {
                        renderHook: {
                            wrapper: function (_a) {
                                var children = _a.children;
                                return (0, jsx_runtime_1.jsx)(src_1.ConfigProvider, __assign({ config: { readOnlyChainId: 1 } }, { children: children }));
                            }
                        }
                    })];
                case 1:
                    _a = _b.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent;
                    return [4 /*yield*/, waitForCurrent(function (val) { return val != undefined; })];
                case 2:
                    _b.sent();
                    (0, chai_1.expect)(result.current['readOnlyChainId']).to.eq(1);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('useUpdateConfig', function () {
    it('updates config', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, result, waitForCurrent;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, testing_1.renderWeb3Hook)(function () {
                        var config = (0, src_1.useConfig)();
                        var updateConfig = (0, src_1.useUpdateConfig)();
                        return { config: config, updateConfig: updateConfig };
                    }, {
                        renderHook: {
                            wrapper: function (_a) {
                                var children = _a.children;
                                return (0, jsx_runtime_1.jsx)(src_1.ConfigProvider, __assign({ config: { readOnlyChainId: 1 } }, { children: children }));
                            }
                        }
                    })];
                case 1:
                    _a = _b.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent;
                    return [4 /*yield*/, waitForCurrent(function (val) { return val != undefined; })];
                case 2:
                    _b.sent();
                    (0, chai_1.expect)(result.current.config['pollingInterval']).to.eq(15000);
                    result.current.updateConfig({ pollingInterval: 10 });
                    return [4 /*yield*/, waitForCurrent(function (val) { return val.config.pollingInterval != 15000; })];
                case 3:
                    _b.sent();
                    (0, chai_1.expect)(result.current.config['pollingInterval']).to.eq(10);
                    return [2 /*return*/];
            }
        });
    }); });
    it('deep updates', function () { return __awaiter(void 0, void 0, void 0, function () {
        var multicallAddresses, _a, result, waitForCurrent;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    multicallAddresses = { 1: '0x1', 2: '0x2' };
                    return [4 /*yield*/, (0, testing_1.renderWeb3Hook)(function () {
                            var config = (0, src_1.useConfig)();
                            var updateConfig = (0, src_1.useUpdateConfig)();
                            return { config: config, updateConfig: updateConfig };
                        }, {
                            renderHook: {
                                wrapper: function (_a) {
                                    var children = _a.children;
                                    return ((0, jsx_runtime_1.jsx)(src_1.ConfigProvider, __assign({ config: { readOnlyChainId: 1, multicallAddresses: multicallAddresses } }, { children: children })));
                                }
                            }
                        })];
                case 1:
                    _a = _b.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent;
                    return [4 /*yield*/, waitForCurrent(function (val) { return val != undefined; })];
                case 2:
                    _b.sent();
                    (0, chai_1.expect)(result.current.config['multicallAddresses']).to.deep.eq(multicallAddresses);
                    result.current.updateConfig({ pollingInterval: 10, multicallAddresses: { 3: '0x3' } });
                    return [4 /*yield*/, waitForCurrent(function (val) { return val.config.pollingInterval != 15000; })];
                case 3:
                    _b.sent();
                    (0, chai_1.expect)(result.current.config['multicallAddresses']).to.deep.eq(__assign(__assign({}, multicallAddresses), { 3: '0x3' }));
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=useConfig.test.js.map