import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { Currency } from './Currency';
import { CurrencyFormatOptions } from './formatting';
export declare class CurrencyValue {
    readonly currency: Currency;
    readonly value: BigNumber;
    constructor(currency: Currency, value: BigNumber);
    static fromString(currency: Currency, value: string): CurrencyValue;
    static zero(currency: Currency): CurrencyValue;
    toString(): string;
    format(overrideOptions?: Partial<CurrencyFormatOptions>): string;
    private checkCurrency;
    map(fn: (value: BigNumber) => BigNumber): CurrencyValue;
    add(other: CurrencyValue): CurrencyValue;
    sub(other: CurrencyValue): CurrencyValue;
    mul(value: BigNumberish): CurrencyValue;
    div(value: BigNumberish): CurrencyValue;
    mod(value: BigNumberish): CurrencyValue;
    equals(other: CurrencyValue): boolean;
    lt(other: CurrencyValue): boolean;
    lte(other: CurrencyValue): boolean;
    gt(other: CurrencyValue): boolean;
    gte(other: CurrencyValue): boolean;
    isZero(): boolean;
}
//# sourceMappingURL=CurrencyValue.d.ts.map