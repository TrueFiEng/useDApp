export declare const DEFAULT_OPTIONS: {
    decimals: number;
    thousandSeparator: string;
    decimalSeparator: string;
    significantDigits: number;
    useFixedPrecision: boolean;
    fixedPrecisionDigits: number;
    prefix: string;
    suffix: string;
};
export declare type CurrencyFormatOptions = typeof DEFAULT_OPTIONS;
export declare function formatCurrency(options: CurrencyFormatOptions, value: string): string;
//# sourceMappingURL=formatting.d.ts.map