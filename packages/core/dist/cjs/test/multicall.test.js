"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var provider_1 = require("@ethereum-waffle/provider");
var abi_1 = require("@ethersproject/abi");
var constants_1 = require("@ethersproject/constants");
var chai_1 = __importStar(require("chai"));
var ethereum_waffle_1 = require("ethereum-waffle");
var chai_as_promised_1 = __importDefault(require("chai-as-promised"));
var src_1 = require("../src");
var bignumber_1 = require("@ethersproject/bignumber");
chai_1["default"].use(ethereum_waffle_1.solidity);
chai_1["default"].use(chai_as_promised_1["default"]);
describe('Multicall', function () {
    var mockProvider = new provider_1.MockProvider();
    var deployer = mockProvider.getWallets()[0];
    var tokenContract;
    var multicallContract;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var args, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    args = ['MOCKToken', 'MOCK', deployer.address, '10000'];
                    return [4 /*yield*/, ethereum_waffle_1.deployContract(deployer, src_1.ERC20Mock, args)];
                case 1:
                    tokenContract = _b.sent();
                    _a = ethereum_waffle_1.deployContract;
                    return [4 /*yield*/, mockProvider.getWallets()];
                case 2: return [4 /*yield*/, _a.apply(void 0, [(_b.sent())[0], {
                            bytecode: src_1.MultiCall.bytecode,
                            abi: src_1.MultiCall.abi
                        }])];
                case 3:
                    multicallContract = _b.sent();
                    return [4 /*yield*/, deployer.sendTransaction({ to: constants_1.AddressZero })];
                case 4:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Retrieves token balance using aggregate', function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, call, blockNumber, result, unwrappedResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = new abi_1.Interface(src_1.ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address]);
                    call = {
                        address: tokenContract.address,
                        data: data
                    };
                    return [4 /*yield*/, mockProvider.getBlockNumber()];
                case 1:
                    blockNumber = _a.sent();
                    return [4 /*yield*/, src_1.multicall(mockProvider, multicallContract.address, blockNumber, [call])];
                case 2:
                    result = _a.sent();
                    unwrappedResult = result[tokenContract.address][data];
                    chai_1.expect(bignumber_1.BigNumber.from(unwrappedResult)).to.eq('10000');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Fails to retrieve data on block number in the future', function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, call, blockNumber;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = new abi_1.Interface(src_1.ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address]);
                    call = {
                        address: tokenContract.address,
                        data: data
                    };
                    return [4 /*yield*/, mockProvider.getBlockNumber()];
                case 1:
                    blockNumber = (_a.sent()) + 1;
                    return [4 /*yield*/, chai_1.expect(src_1.multicall(mockProvider, multicallContract.address, blockNumber, [call])).to.be.eventually.rejected];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Does not fail when retrieving data on block number from the past', function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, call, blockNumber, result, unwrappedResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = new abi_1.Interface(src_1.ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address]);
                    call = {
                        address: tokenContract.address,
                        data: data
                    };
                    return [4 /*yield*/, mockProvider.getBlockNumber()];
                case 1:
                    blockNumber = (_a.sent()) - 1;
                    return [4 /*yield*/, src_1.multicall(mockProvider, multicallContract.address, blockNumber, [call])];
                case 2:
                    result = _a.sent();
                    unwrappedResult = result[tokenContract.address][data];
                    chai_1.expect(bignumber_1.BigNumber.from(unwrappedResult)).to.eq('10000');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Does not fail when doing multiple calls at once', function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, call, blockNumber;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = new abi_1.Interface(src_1.ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address]);
                    call = {
                        address: tokenContract.address,
                        data: data
                    };
                    return [4 /*yield*/, mockProvider.getBlockNumber()];
                case 1:
                    blockNumber = _a.sent();
                    return [4 /*yield*/, Promise.all([
                            src_1.multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                            src_1.multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                            src_1.multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                            src_1.multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                            src_1.multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                            src_1.multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                            src_1.multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                            src_1.multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                            src_1.multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                            src_1.multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                            src_1.multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                            src_1.multicall(mockProvider, multicallContract.address, blockNumber, [call]),
                        ])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=multicall.test.js.map