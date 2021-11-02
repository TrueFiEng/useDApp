"use strict";
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
var core_1 = require("@usedapp/core");
var chai_1 = require("chai");
var ethereum_waffle_1 = require("ethereum-waffle");
var ethers_1 = require("ethers");
var src_1 = require("../src");
describe('useSendTransaction', function () {
    var mockProvider = new ethereum_waffle_1.MockProvider();
    var _a = mockProvider.getWallets(), spender = _a[0], receiver = _a[1], secondReceiver = _a[2];
    it('success', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, result, waitForCurrent, spenderBalance, receiverBalance, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, src_1.renderWeb3Hook(core_1.useSendTransaction, { mockProvider: mockProvider })];
                case 1:
                    _a = _d.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent;
                    return [4 /*yield*/, spender.getBalance()];
                case 2:
                    spenderBalance = _d.sent();
                    return [4 /*yield*/, receiver.getBalance()];
                case 3:
                    receiverBalance = _d.sent();
                    return [4 /*yield*/, result.current.sendTransaction({ to: receiver.address, value: ethers_1.BigNumber.from(10), gasPrice: 0 })];
                case 4:
                    _d.sent();
                    return [4 /*yield*/, waitForCurrent(function (val) { return val.state !== undefined; })];
                case 5:
                    _d.sent();
                    chai_1.expect(result.current.state.status).to.eq('Success');
                    _b = chai_1.expect;
                    return [4 /*yield*/, receiver.getBalance()];
                case 6:
                    _b.apply(void 0, [_d.sent()]).to.eq(receiverBalance.add(10));
                    _c = chai_1.expect;
                    return [4 /*yield*/, spender.getBalance()];
                case 7:
                    _c.apply(void 0, [_d.sent()]).to.eq(spenderBalance.sub(10));
                    return [2 /*return*/];
            }
        });
    }); });
    it('sends with different signer', function () { return __awaiter(void 0, void 0, void 0, function () {
        var receiverBalance, secondReceiverBalance, _a, result, waitForCurrent, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, receiver.getBalance()];
                case 1:
                    receiverBalance = _d.sent();
                    return [4 /*yield*/, secondReceiver.getBalance()];
                case 2:
                    secondReceiverBalance = _d.sent();
                    return [4 /*yield*/, src_1.renderWeb3Hook(function () { return core_1.useSendTransaction({ signer: receiver }); }, {
                            mockProvider: mockProvider
                        })];
                case 3:
                    _a = _d.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent;
                    return [4 /*yield*/, result.current.sendTransaction({ to: secondReceiver.address, value: ethers_1.BigNumber.from(10) })];
                case 4:
                    _d.sent();
                    return [4 /*yield*/, waitForCurrent(function (val) { return val.state != undefined; })];
                case 5:
                    _d.sent();
                    chai_1.expect(result.current.state.status).to.eq('Success');
                    _b = chai_1.expect;
                    return [4 /*yield*/, secondReceiver.getBalance()];
                case 6:
                    _b.apply(void 0, [_d.sent()]).to.eq(secondReceiverBalance.add(10));
                    _c = chai_1.expect;
                    return [4 /*yield*/, receiver.getBalance()];
                case 7:
                    _c.apply(void 0, [_d.sent()]).to.not.eq(receiverBalance);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Exception(invalid sender)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, result, waitForCurrent;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, src_1.renderWeb3Hook(core_1.useSendTransaction, { mockProvider: mockProvider })];
                case 1:
                    _a = _c.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent;
                    return [4 /*yield*/, result.current.sendTransaction({ to: '0x1', value: ethers_1.utils.parseEther('1') })];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, waitForCurrent(function (val) { return val.state !== undefined; })];
                case 3:
                    _c.sent();
                    chai_1.expect(result.current.state.status).to.eq('Exception');
                    if (result.current.state.status === 'Exception')
                        chai_1.expect((_b = result.current.state) === null || _b === void 0 ? void 0 : _b.errorMessage).to.eq('invalid address');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=useSendTransaction.test.js.map