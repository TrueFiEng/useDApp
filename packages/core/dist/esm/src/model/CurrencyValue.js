import { BigNumber } from '@ethersproject/bignumber';
export class CurrencyValue {
    constructor(currency, value) {
        this.currency = currency;
        this.value = value;
    }
    static fromString(currency, value) {
        return new CurrencyValue(currency, BigNumber.from(value));
    }
    static zero(currency) {
        return new CurrencyValue(currency, BigNumber.from(0));
    }
    toString() {
        return this.value.toString();
    }
    format(overrideOptions = {}) {
        return this.currency.format(this.value.toString(), overrideOptions);
    }
    checkCurrency(other) {
        if (this.currency !== other.currency) {
            throw new TypeError(`Currency mismatch ${this.currency.ticker} != ${other.currency.ticker}`);
        }
    }
    map(fn) {
        return new CurrencyValue(this.currency, fn(this.value));
    }
    add(other) {
        this.checkCurrency(other);
        return this.map((x) => x.add(other.value));
    }
    sub(other) {
        this.checkCurrency(other);
        return this.map((x) => x.sub(other.value));
    }
    mul(value) {
        return this.map((x) => x.mul(value));
    }
    div(value) {
        return this.map((x) => x.div(value));
    }
    mod(value) {
        return this.map((x) => x.mod(value));
    }
    equals(other) {
        return this.currency === other.currency && this.value.eq(other.value);
    }
    lt(other) {
        this.checkCurrency(other);
        return this.value.lt(other.value);
    }
    lte(other) {
        this.checkCurrency(other);
        return this.value.lte(other.value);
    }
    gt(other) {
        this.checkCurrency(other);
        return this.value.gt(other.value);
    }
    gte(other) {
        this.checkCurrency(other);
        return this.value.gte(other.value);
    }
    isZero() {
        return this.value.isZero();
    }
}
//# sourceMappingURL=CurrencyValue.js.map