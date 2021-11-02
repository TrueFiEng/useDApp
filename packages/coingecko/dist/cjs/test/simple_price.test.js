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
var chai_1 = require("chai");
var simple_price_1 = require("../src/simple_price");
describe('getCoingeckoSimplePrice', function () {
    it('ethereum in usd price', function () {
        var url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
        chai_1.expect(simple_price_1.getCoingeckoSimplePriceUri('ethereum', 'usd')).to.eq(url);
    });
    it('bitcoin in usd price', function () {
        var url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
        chai_1.expect(simple_price_1.getCoingeckoSimplePriceUri('bitcoin', 'usd')).to.eq(url);
    });
    it('dai in usd price', function () {
        var url = 'https://api.coingecko.com/api/v3/simple/price?ids=dai&vs_currencies=usd';
        chai_1.expect(simple_price_1.getCoingeckoSimplePriceUri('dai', 'usd')).to.eq(url);
    });
});
describe('getCoingeckoPriceFetch', function () {
    it('Success', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockFetch, getCoingeckoPrice, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    mockFetch = function () {
                        return Promise.resolve({
                            json: function () { return ({ ethereum: { usd: 2234.6 } }); }
                        });
                    };
                    getCoingeckoPrice = simple_price_1.fetchCoingeckoPrice(mockFetch);
                    _a = chai_1.expect;
                    return [4 /*yield*/, getCoingeckoPrice('ethereum', 'usd')];
                case 1:
                    _a.apply(void 0, [_b.sent()]).to.eq('2234.6');
                    return [2 /*return*/];
            }
        });
    }); });
    it('No Answer', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockFetch, getCoingeckoPrice, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    mockFetch = function () {
                        throw new Error();
                    };
                    getCoingeckoPrice = simple_price_1.fetchCoingeckoPrice(mockFetch);
                    _a = chai_1.expect;
                    return [4 /*yield*/, getCoingeckoPrice('ethereum', 'usd')];
                case 1:
                    _a.apply(void 0, [_b.sent()]).to.eq(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Wrong Answer', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockFetch, getCoingeckoPrice, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    mockFetch = function () {
                        return Promise.resolve({
                            json: function () { return ({ eth: { usd: 2234.6 } }); }
                        });
                    };
                    getCoingeckoPrice = simple_price_1.fetchCoingeckoPrice(mockFetch);
                    _a = chai_1.expect;
                    return [4 /*yield*/, getCoingeckoPrice('ethereum', 'usd')];
                case 1:
                    _a.apply(void 0, [_b.sent()]).to.eq(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=simple_price.test.js.map