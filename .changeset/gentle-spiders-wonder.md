---
'@usedapp/core': minor
---

Currency
--------

Update the `Currency` class. It is now tasked with representing the individual currencies as well as handling formatting.

The base `Currency` class is constructed with the following parameters:
- `name` - name of the currency
- `ticker` - e.g. USD, EUR, BTC
- `decimals` - number of decimal places (e.g. 2 for USD, 18 for ETH)
- `formattingOptions` - define how the currency values are formatted

The following formatting options are supported:

- `decimals` - Defaults to the decimals of the currency.
- `thousandSeparator` - Defaults to ','. Used for separating thousands.
- `decimalSeparator` - Defaults to '.'. Used for separating the integer part from the decimal part.
- `significantDigits` - Defaults to Infinity. Can limit the number of digits on the decimal part, such that either the total number of displayed digits is equal to this parameter or more digits are displayed, but the decimal part is missing.
- `useFixedPrecision` - Defaults to false. Switches from using significant digits to fixed precision digits.
- `fixedPrecisionDigits` - Defaults to 0. Can specify the number of digits on the decimal part.
- `prefix` - Defaults to ''. Prepended to the result.
- `suffix` - Defaults to ''. Appended to the result.

Other variants of `Currency` include `FiatCurrency`, `NativeCurrency` and `Token`.

`FiatCurrency` takes the same parameters as `Currency` but uses fixed precision digits by default.

`NativeCurrency` additionally takes a `chainId` parameter. The format function is configured with the ticker prefix and 6 significant digits by default.

`Token` additionally takes a `chainId` parameter as well as an `address` parameter. The format function is configured with the ticker prefix and 6 significant digits by default.

CurrencyValue
-------------

Introduces the `CurrencyValue` class. This class represents a value tied to a currency. The methods include:

- `static fromString(currency, value)` - creates a new CurrencyValue from string.
- `static zero(currency)` - creates a new CurrencyValue equal to 0.
- `toString()` - returns the value of the CurrencyValue as a decimal string with no formatting.
- `format(overrideOptions?)` - formats the value according to the currency. The caller can override the formatting options.
- `map(fn)` - returns a new CurrencyValue with value transformed by the callback.
- `add(other)` - returns a new CurrencyValue with value being the sum of this value and other value. The argument must be a CurrencyValue with the same Currency.
- `sub(other)` - returns a new CurrencyValue with value being the difference of this value and other value. The argument must be a CurrencyValue with the same Currency.
- `mul(value)` - returns a new CurrencyValue with value multiplied by the argument.
- `div(value)` - returns a new CurrencyValue with value divided by the argument.
- `mod(value)` - returns a new CurrencyValue with value modulo the argument.
- `equals(other)` - performs an equality check on the currencies and the values of both objects.
- `lt(other)` - checks if this value is less than the other value. The argument must be a CurrencyValue with the same Currency.
- `lte(other)` - checks if this value is less than or equal to the other value. The argument must be a CurrencyValue with the same Currency.
- `gt(other)` - checks if this value is greater than the other value. The argument must be a CurrencyValue with the same Currency.
- `gte(other)` - checks if this value is greater than or equal to the other value. The argument must be a CurrencyValue with the same Currency.
- `isZero()` - returns true if the value is zero.
