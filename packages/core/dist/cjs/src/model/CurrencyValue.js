"use strict";
exports.__esModule = true;
exports.CurrencyValue = void 0;
var bignumber_1 = require("@ethersproject/bignumber");
var CurrencyValue = /** @class */ (function () {
    function CurrencyValue(currency, value) {
        this.currency = currency;
        this.value = value;
    }
    CurrencyValue.fromString = function (currency, value) {
        return new CurrencyValue(currency, bignumber_1.BigNumber.from(value));
    };
    CurrencyValue.zero = function (currency) {
        return new CurrencyValue(currency, bignumber_1.BigNumber.from(0));
    };
    CurrencyValue.prototype.toString = function () {
        return this.value.toString();
    };
    CurrencyValue.prototype.format = function (overrideOptions) {
        if (overrideOptions === void 0) { overrideOptions = {}; }
        return this.currency.format(this.value.toString(), overrideOptions);
    };
    CurrencyValue.prototype.checkCurrency = function (other) {
        if (this.currency !== other.currency) {
            throw new TypeError("Currency mismatch " + this.currency.ticker + " != " + other.currency.ticker);
        }
    };
    CurrencyValue.prototype.map = function (fn) {
        return new CurrencyValue(this.currency, fn(this.value));
    };
    CurrencyValue.prototype.add = function (other) {
        this.checkCurrency(other);
        return this.map(function (x) { return x.add(other.value); });
    };
    CurrencyValue.prototype.sub = function (other) {
        this.checkCurrency(other);
        return this.map(function (x) { return x.sub(other.value); });
    };
    CurrencyValue.prototype.mul = function (value) {
        return this.map(function (x) { return x.mul(value); });
    };
    CurrencyValue.prototype.div = function (value) {
        return this.map(function (x) { return x.div(value); });
    };
    CurrencyValue.prototype.mod = function (value) {
        return this.map(function (x) { return x.mod(value); });
    };
    CurrencyValue.prototype.equals = function (other) {
        return this.currency === other.currency && this.value.eq(other.value);
    };
    CurrencyValue.prototype.lt = function (other) {
        this.checkCurrency(other);
        return this.value.lt(other.value);
    };
    CurrencyValue.prototype.lte = function (other) {
        this.checkCurrency(other);
        return this.value.lte(other.value);
    };
    CurrencyValue.prototype.gt = function (other) {
        this.checkCurrency(other);
        return this.value.gt(other.value);
    };
    CurrencyValue.prototype.gte = function (other) {
        this.checkCurrency(other);
        return this.value.gte(other.value);
    };
    CurrencyValue.prototype.isZero = function () {
        return this.value.isZero();
    };
    return CurrencyValue;
}());
exports.CurrencyValue = CurrencyValue;
//# sourceMappingURL=CurrencyValue.js.map