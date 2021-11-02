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
var useAdder_1 = require("./useAdder");
var src_1 = require("../src");
describe('useAdder', function () {
    it('properly renders without arguments or context wrapper', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, src_1.renderWeb3Hook(useAdder_1.useAdder)];
                case 1:
                    result = (_a.sent()).result;
                    chai_1.expect(result.error).to.be.undefined;
                    chai_1.expect(result.current.sum).to.be.equal(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('properly renders with arguments', function () { return __awaiter(void 0, void 0, void 0, function () {
        var firstExample, secondExample;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, src_1.renderWeb3Hook(function () { return useAdder_1.useAdder(1, 1); })];
                case 1:
                    firstExample = (_a.sent()).result;
                    return [4 /*yield*/, src_1.renderWeb3Hook(function (_a) {
                            var arg1 = _a.arg1, arg2 = _a.arg2;
                            return useAdder_1.useAdder(arg1, arg2);
                        }, {
                            renderHook: { initialProps: { arg1: 1, arg2: 1 } }
                        })];
                case 2:
                    secondExample = (_a.sent()).result;
                    chai_1.expect(firstExample.current.sum).to.be.equal(2);
                    chai_1.expect(secondExample.current.sum).to.be.equal(2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('properly renders with changing arguments', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, result, rerender;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, src_1.renderWeb3Hook(function (_a) {
                        var arg1 = _a.arg1, arg2 = _a.arg2;
                        return useAdder_1.useAdder(arg1, arg2);
                    }, {
                        renderHook: { initialProps: { arg1: 1, arg2: 1 } }
                    })];
                case 1:
                    _a = _b.sent(), result = _a.result, rerender = _a.rerender;
                    chai_1.expect(result.current.sum).to.be.equal(2);
                    rerender({ arg1: 2, arg2: 3 });
                    chai_1.expect(result.current.sum).to.be.equal(5);
                    return [2 /*return*/];
            }
        });
    }); });
    it('properly renders with context wrapper', function () { return __awaiter(void 0, void 0, void 0, function () {
        var firstExample, secondExample;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, src_1.renderWeb3Hook(useAdder_1.useAdder, {
                        renderHook: {
                            wrapper: function (_a) {
                                var children = _a.children;
                                return jsx_runtime_1.jsx(useAdder_1.AdderProvider, __assign({ value: { prov1: 2, prov2: 2 } }, { children: children }), void 0);
                            }
                        }
                    })];
                case 1:
                    firstExample = (_a.sent()).result;
                    return [4 /*yield*/, src_1.renderWeb3Hook(function () { return useAdder_1.useAdder(); }, {
                            renderHook: {
                                wrapper: function (_a) {
                                    var children = _a.children, prov1 = _a.prov1, prov2 = _a.prov2;
                                    return jsx_runtime_1.jsx(useAdder_1.AdderProvider, __assign({ value: { prov1: prov1, prov2: prov2 } }, { children: children }), void 0);
                                },
                                initialProps: { prov1: 2, prov2: 2 }
                            }
                        })];
                case 2:
                    secondExample = (_a.sent()).result;
                    chai_1.expect(firstExample.current.sum).to.be.equal(4);
                    chai_1.expect(secondExample.current.sum).to.be.equal(4);
                    return [2 /*return*/];
            }
        });
    }); });
    it('properly renders with context wrapper changing props', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, result, rerender;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, src_1.renderWeb3Hook(function () { return useAdder_1.useAdder(); }, {
                        renderHook: {
                            wrapper: function (_a) {
                                var children = _a.children, prov1 = _a.prov1, prov2 = _a.prov2;
                                return jsx_runtime_1.jsx(useAdder_1.AdderProvider, __assign({ value: { prov1: prov1, prov2: prov2 } }, { children: children }), void 0);
                            },
                            initialProps: { prov1: 2, prov2: 2 }
                        }
                    })];
                case 1:
                    _a = _b.sent(), result = _a.result, rerender = _a.rerender;
                    chai_1.expect(result.current.sum).to.be.equal(4);
                    rerender({ prov1: 3, prov2: 3 });
                    chai_1.expect(result.current.sum).to.be.equal(6);
                    return [2 /*return*/];
            }
        });
    }); });
    it('properly renders with arguments and context wrapper', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, src_1.renderWeb3Hook(function (_a) {
                        var arg1 = _a.arg1, arg2 = _a.arg2;
                        return useAdder_1.useAdder(arg1, arg2);
                    }, {
                        renderHook: {
                            wrapper: function (_a) {
                                var children = _a.children, prov1 = _a.prov1, prov2 = _a.prov2;
                                return jsx_runtime_1.jsx(useAdder_1.AdderProvider, __assign({ value: { prov1: prov1, prov2: prov2 } }, { children: children }), void 0);
                            },
                            initialProps: { arg1: 1, arg2: 1, prov1: 2, prov2: 2 }
                        }
                    })];
                case 1:
                    result = (_a.sent()).result;
                    chai_1.expect(result.error).to.be.undefined;
                    chai_1.expect(result.current.sum).to.be.equal(6);
                    return [2 /*return*/];
            }
        });
    }); });
    it('properly renders with changing arguments and context wrapper changing props', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, result, rerender;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, src_1.renderWeb3Hook(function (_a) {
                        var arg1 = _a.arg1, arg2 = _a.arg2;
                        return useAdder_1.useAdder(arg1, arg2);
                    }, {
                        renderHook: {
                            wrapper: function (_a) {
                                var children = _a.children, prov1 = _a.prov1, prov2 = _a.prov2;
                                return jsx_runtime_1.jsx(useAdder_1.AdderProvider, __assign({ value: { prov1: prov1, prov2: prov2 } }, { children: children }), void 0);
                            },
                            initialProps: { arg1: 1, arg2: 1, prov1: 2, prov2: 2 }
                        }
                    })];
                case 1:
                    _a = _b.sent(), result = _a.result, rerender = _a.rerender;
                    chai_1.expect(result.error).to.be.undefined;
                    chai_1.expect(result.current.sum).to.be.equal(6);
                    rerender({ arg1: 2, arg2: 2, prov1: 3, prov2: 3 });
                    chai_1.expect(result.current.sum).to.be.equal(10);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=useAdder.test.js.map