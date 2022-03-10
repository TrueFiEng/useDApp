import { DEFAULT_OPTIONS, formatCurrency } from './formatting';
export class Currency {
    constructor(name, ticker, decimals, formattingOptions = {}) {
        this.name = name;
        this.ticker = ticker;
        this.decimals = decimals;
        this.formattingOptions = Object.assign(Object.assign(Object.assign({}, DEFAULT_OPTIONS), { decimals }), formattingOptions);
    }
    format(value, overrideOptions = {}) {
        return formatCurrency(Object.assign(Object.assign({}, this.formattingOptions), overrideOptions), value);
    }
}
export class FiatCurrency extends Currency {
    constructor(name, ticker, decimals = 2, formattingOptions = {}) {
        super(name, ticker, decimals, Object.assign({ useFixedPrecision: true, fixedPrecisionDigits: decimals }, formattingOptions));
    }
}
export class NativeCurrency extends Currency {
    constructor(name, ticker, chainId, decimals = 18, formattingOptions = {}) {
        super(name, ticker, decimals, Object.assign({ suffix: ` ${ticker}`, significantDigits: 6 }, formattingOptions));
        this.chainId = chainId;
    }
}
export class Token extends Currency {
    constructor(name, ticker, chainId, address, decimals = 18, formattingOptions = {}) {
        super(name, ticker, decimals, Object.assign({ suffix: ` ${ticker}`, significantDigits: 6 }, formattingOptions));
        this.chainId = chainId;
        this.address = address;
    }
}
//# sourceMappingURL=Currency.js.map