import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import { Currency } from './Currency'
import { CurrencyFormatOptions } from './formatting'

export class CurrencyValue {
  constructor(readonly currency: Currency, readonly value: BigNumber) {}

  static fromString(currency: Currency, value: string) {
    return new CurrencyValue(currency, BigNumber.from(value))
  }

  static zero(currency: Currency) {
    return new CurrencyValue(currency, BigNumber.from(0))
  }

  toString() {
    return this.value.toString()
  }

  format(overrideOptions: Partial<CurrencyFormatOptions> = {}) {
    return this.currency.format(this.value.toString(), overrideOptions)
  }

  private checkCurrency(other: CurrencyValue) {
    if (this.currency !== other.currency) {
      throw new TypeError(`Currency mismatch ${this.currency.ticker} != ${other.currency.ticker}`)
    }
  }

  map(fn: (value: BigNumber) => BigNumber) {
    return new CurrencyValue(this.currency, fn(this.value))
  }

  add(other: CurrencyValue) {
    this.checkCurrency(other)
    return this.map((x) => x.add(other.value))
  }

  sub(other: CurrencyValue) {
    this.checkCurrency(other)
    return this.map((x) => x.sub(other.value))
  }

  mul(value: BigNumberish) {
    return this.map((x) => x.mul(value))
  }

  div(value: BigNumberish) {
    return this.map((x) => x.div(value))
  }

  mod(value: BigNumberish) {
    return this.map((x) => x.mod(value))
  }

  equals(other: CurrencyValue) {
    return this.currency === other.currency && this.value.eq(other.value)
  }

  lt(other: CurrencyValue) {
    this.checkCurrency(other)
    return this.value.lt(other.value)
  }

  lte(other: CurrencyValue) {
    this.checkCurrency(other)
    return this.value.lte(other.value)
  }

  gt(other: CurrencyValue) {
    this.checkCurrency(other)
    return this.value.gt(other.value)
  }

  gte(other: CurrencyValue) {
    this.checkCurrency(other)
    return this.value.gte(other.value)
  }

  isZero() {
    return this.value.isZero()
  }
}
