import { ChainId } from '../constants'
import { CurrencyFormatOptions, DEFAULT_OPTIONS, formatCurrency } from './formatting'

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
    readonly chainId: ChainId,
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
    readonly chainId: ChainId,
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
