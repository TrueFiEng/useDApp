import { ChainId } from '../constants';
import { CurrencyFormatOptions } from './formatting';
export declare class Currency {
    readonly name: string;
    readonly ticker: string;
    readonly decimals: number;
    formattingOptions: CurrencyFormatOptions;
    constructor(name: string, ticker: string, decimals: number, formattingOptions?: Partial<CurrencyFormatOptions>);
    format(value: string, overrideOptions?: Partial<CurrencyFormatOptions>): string;
}
export declare class FiatCurrency extends Currency {
    constructor(name: string, ticker: string, decimals?: number, formattingOptions?: Partial<CurrencyFormatOptions>);
}
export declare class NativeCurrency extends Currency {
    readonly chainId: ChainId;
    constructor(name: string, ticker: string, chainId: ChainId, decimals?: number, formattingOptions?: Partial<CurrencyFormatOptions>);
}
export declare class Token extends Currency {
    readonly chainId: ChainId;
    readonly address: string;
    constructor(name: string, ticker: string, chainId: ChainId, address: string, decimals?: number, formattingOptions?: Partial<CurrencyFormatOptions>);
}
//# sourceMappingURL=Currency.d.ts.map