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
exports.useCoingeckoTokenPrice = exports.useCoingeckoPrice = void 0;
var react_1 = require("react");
var core_1 = require("@usedapp/core");
var simple_price_1 = require("./simple_price");
var simple_token_price_1 = require("./simple_token_price");
var useCoingeckoPrice = function (base, quote) {
    if (quote === void 0) { quote = 'usd'; }
    var _a = react_1.useState(undefined), price = _a[0], setPrice = _a[1];
    var blockNo = core_1.useBlockNumber();
    react_1.useEffect(function () {
        function getPrice() {
            return __awaiter(this, void 0, void 0, function () {
                var tokenPrice;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, simple_price_1.getCoingeckoPrice(base, quote)];
                        case 1:
                            tokenPrice = _a.sent();
                            setPrice(tokenPrice);
                            return [2 /*return*/];
                    }
                });
            });
        }
        getPrice();
    }, [base, quote, blockNo]);
    return price;
};
exports.useCoingeckoPrice = useCoingeckoPrice;
var useCoingeckoTokenPrice = function (contract, quote, platform) {
    if (quote === void 0) { quote = 'usd'; }
    if (platform === void 0) { platform = 'ethereum'; }
    var _a = react_1.useState(undefined), price = _a[0], setPrice = _a[1];
    var blockNo = core_1.useBlockNumber();
    react_1.useEffect(function () {
        function getPrice() {
            return __awaiter(this, void 0, void 0, function () {
                var tokenPrice;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, simple_token_price_1.getCoingeckoTokenPrice(contract, quote, platform)];
                        case 1:
                            tokenPrice = _a.sent();
                            setPrice(tokenPrice);
                            return [2 /*return*/];
                    }
                });
            });
        }
        getPrice();
    }, [contract, quote, platform, blockNo]);
    return price;
};
exports.useCoingeckoTokenPrice = useCoingeckoTokenPrice;
//# sourceMappingURL=index.js.map