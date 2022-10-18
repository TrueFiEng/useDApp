import { CurrencyFormatOptions, DEFAULT_OPTIONS, formatCurrency } from './formatting'

/**
 * The ``Currency`` class is tasked with representing the individual currencies as well as handling formatting.
 *
 * The base ``Currency`` class is constructed with the following parameters:
 * - ``name`` - name of the currency
 * - ``ticker`` - e.g. USD, EUR, BTC
 * - ``decimals`` - number of decimal places (e.g. 2 for USD, 18 for ETH)
 * - ``formattingOptions`` - define how the currency values are formatted
 * The following formatting options are supported:
 * - ``decimals`` - Defaults to the decimals of the currency.
 * - ``thousandSeparator`` - Defaults to ``','``. Used for separating thousands.
 * - ``decimalSeparator`` - Defaults to ``'.'``. Used for separating the integer part from the decimal part.
 * - ``significantDigits`` - Defaults to Infinity. Can limit the number of digits on the decimal part, such that either the total number of displayed digits is equal to this parameter or more digits are displayed, but the decimal part is missing.
 * - ``useFixedPrecision`` - Defaults to false. Switches from using significant digits to fixed precision digits.
 * - ``fixedPrecisionDigits`` - Defaults to 0. Can specify the number of digits on the decimal part.
 * - ``prefix`` - Defaults to ``''``. Prepended to the result.
 * - ``suffix`` - Defaults to ``''``. Appended to the result.
 * Other variants of ``Currency`` include ``FiatCurrency``, ``NativeCurrency`` and ``Token``.
 * ``FiatCurrency`` takes the same parameters as ``Currency`` but uses fixed precision digits by default.
 * ``NativeCurrency`` additionally takes a ``chainId`` parameter. The format function is configured with the ticker prefix and 6 significant digits by default.
 * ``Token`` additionally takes a ``chainId`` parameter as well as an ``address`` parameter. The format function is configured with the ticker prefix and 6 significant digits by default.
 *
 * @public
 */
export class Currency {
  public formattingOptions: CurrencyFormatOptions

  constructor(
    readonly name: string,
    readonly ticker: string,
    readonly decimals: number,
    formattingOptions: Partial<CurrencyFormatOptions> = {}
  ) {
    this.formattingOptions = { ...DEFAULT_OPTIONS, decimals, ...formattingOptions }
  }

  format(value: string, overrideOptions: Partial<CurrencyFormatOptions> = {}) {
    return formatCurrency({ ...this.formattingOptions, ...overrideOptions }, value)
  }
}

export class FiatCurrency extends Currency {
  constructor(name: string, ticker: string, decimals = 2, formattingOptions: Partial<CurrencyFormatOptions> = {}) {
    super(name, ticker, decimals, {
      useFixedPrecision: true,
      fixedPrecisionDigits: decimals,
      ...formattingOptions,
    })
  }
}

export class NativeCurrency extends Currency {
  constructor(
    name: string,
    ticker: string,
    readonly chainId: number,
    decimals = 18,
    formattingOptions: Partial<CurrencyFormatOptions> = {}
  ) {
    super(name, ticker, decimals, {
      suffix: ` ${ticker}`,
      significantDigits: 6,
      ...formattingOptions,
    })
  }
}

export class Token extends Currency {
  constructor(
    name: string,
    ticker: string,
    readonly chainId: number,
    readonly address: string,
    decimals = 18,
    formattingOptions: Partial<CurrencyFormatOptions> = {}
  ) {
    super(name, ticker, decimals, {
      suffix: ` ${ticker}`,
      significantDigits: 6,
      ...formattingOptions,
    })
  }
}
