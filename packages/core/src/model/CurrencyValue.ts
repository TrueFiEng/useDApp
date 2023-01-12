import { BigNumber, BigNumberish } from 'ethers'
import { Currency } from './Currency'
import { CurrencyFormatOptions } from './formatting'

/**
 * The `CurrencyValue` class represents a value tied to a currency. The methods include:
 * - `static fromString(currency, value)` - creates a new CurrencyValue from string.
 * - `static zero(currency)` - creates a new CurrencyValue equal to 0.
 * - `toString()` - returns the value of the CurrencyValue as a decimal string with no formatting.
 * - `format(overrideOptions?)` - formats the value according to the currency. The caller can override the formatting options.
 * - `map(fn)` - returns a new CurrencyValue with value transformed by the callback.
 * - `add(other)` - returns a new CurrencyValue with value being the sum of this value and other value. The argument must be a CurrencyValue with the same Currency.
 * - `sub(other)` - returns a new CurrencyValue with value being the difference of this value and other value. The argument must be a CurrencyValue with the same Currency.
 * - `mul(value)` - returns a new CurrencyValue with value multiplied by the argument.
 * - `div(value)` - returns a new CurrencyValue with value divided by the argument.
 * - `mod(value)` - returns a new CurrencyValue with value modulo the argument.
 * - `equals(other)` - performs an equality check on the currencies and the values of both objects.
 * - `lt(other)` - checks if this value is less than the other value. The argument must be a CurrencyValue with the same Currency.
 * - `lte(other)` - checks if this value is less than or equal to the other value. The argument must be a CurrencyValue with the same Currency.
 * - `gt(other)` - checks if this value is greater than the other value. The argument must be a CurrencyValue with the same Currency.
 * - `gte(other)` - checks if this value is greater than or equal to the other value. The argument must be a CurrencyValue with the same Currency.
 * - `isZero()` - returns true if the value is zero.
 *
 * @public
 */
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
