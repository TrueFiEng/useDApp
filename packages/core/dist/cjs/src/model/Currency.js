"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.Token = exports.NativeCurrency = exports.FiatCurrency = exports.Currency = void 0;
var formatting_1 = require("./formatting");
var Currency = /** @class */ (function () {
    function Currency(name, ticker, decimals, formattingOptions) {
        if (formattingOptions === void 0) { formattingOptions = {}; }
        this.name = name;
        this.ticker = ticker;
        this.decimals = decimals;
        this.formattingOptions = __assign(__assign(__assign({}, formatting_1.DEFAULT_OPTIONS), { decimals: decimals }), formattingOptions);
    }
    Currency.prototype.format = function (value, overrideOptions) {
        if (overrideOptions === void 0) { overrideOptions = {}; }
        return formatting_1.formatCurrency(__assign(__assign({}, this.formattingOptions), overrideOptions), value);
    };
    return Currency;
}());
exports.Currency = Currency;
var FiatCurrency = /** @class */ (function (_super) {
    __extends(FiatCurrency, _super);
    function FiatCurrency(name, ticker, decimals, formattingOptions) {
        if (decimals === void 0) { decimals = 2; }
        if (formattingOptions === void 0) { formattingOptions = {}; }
        return _super.call(this, name, ticker, decimals, __assign({ useFixedPrecision: true, fixedPrecisionDigits: decimals }, formattingOptions)) || this;
    }
    return FiatCurrency;
}(Currency));
exports.FiatCurrency = FiatCurrency;
var NativeCurrency = /** @class */ (function (_super) {
    __extends(NativeCurrency, _super);
    function NativeCurrency(name, ticker, chainId, decimals, formattingOptions) {
        if (decimals === void 0) { decimals = 18; }
        if (formattingOptions === void 0) { formattingOptions = {}; }
        var _this = _super.call(this, name, ticker, decimals, __assign({ suffix: " " + ticker, significantDigits: 6 }, formattingOptions)) || this;
        _this.chainId = chainId;
        return _this;
    }
    return NativeCurrency;
}(Currency));
exports.NativeCurrency = NativeCurrency;
var Token = /** @class */ (function (_super) {
    __extends(Token, _super);
    function Token(name, ticker, chainId, address, decimals, formattingOptions) {
        if (decimals === void 0) { decimals = 18; }
        if (formattingOptions === void 0) { formattingOptions = {}; }
        var _this = _super.call(this, name, ticker, decimals, __assign({ suffix: " " + ticker, significantDigits: 6 }, formattingOptions)) || this;
        _this.chainId = chainId;
        _this.address = address;
        return _this;
    }
    return Token;
}(Currency));
exports.Token = Token;
//# sourceMappingURL=Currency.js.map