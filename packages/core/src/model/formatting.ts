export const DEFAULT_OPTIONS = {
  decimals: 0,
  thousandSeparator: ',',
  decimalSeparator: '.',
  significantDigits: Infinity,
  useFixedPrecision: false,
  fixedPrecisionDigits: 0,
  prefix: '',
  suffix: '',
}

export type CurrencyFormatOptions = typeof DEFAULT_OPTIONS

const INPUT_REGEX = /^\d*$/

export function formatCurrency(options: CurrencyFormatOptions, value: string): string {
  if (!INPUT_REGEX.test(value)) {
    throw new TypeError('Invalid input, decimal string expected.')
  }
  const number = formatNumber(options, value)
  return [options.prefix, number, options.suffix].join('')
}

function formatNumber(options: CurrencyFormatOptions, value: string) {
  const integer = getIntegerPart(value, options.decimals)
  const thousands = splitThousands(integer, options.thousandSeparator)
  const decimal = getDecimalPart(value, options.decimals)
  const digits = options.useFixedPrecision
    ? toFixed(decimal, options.fixedPrecisionDigits)
    : toSignificant(decimal, integer.length, options.significantDigits)
  return joinDecimals(thousands, digits, options.decimalSeparator)
}

function getIntegerPart(value: string, decimals: number) {
  if (value.length <= decimals) {
    return '0'
  } else {
    const fragment = value.substring(0, value.length - decimals)
    return stripFrontZeroes(fragment)
  }
}

function stripFrontZeroes(value: string) {
  const stripped = value.replace(/^0+/, '')
  return stripped || '0'
}

function splitThousands(value: string, separator: string) {
  const count = value.length / 3
  const resultValue = value.split('')
  for (let i = 1; i < count; i++) {
    resultValue.splice(-4 * i + 1, 0, separator)
  }
  return resultValue.join('')
}

function getDecimalPart(value: string, decimals: number) {
  if (value.length <= decimals) {
    return value.padStart(decimals, '0')
  } else {
    return value.substring(value.length - decimals)
  }
}

function joinDecimals(integer: string, decimals: string, separator: string) {
  if (!decimals) {
    return integer
  } else {
    return `${integer}${separator}${decimals}`
  }
}

function toSignificant(decimal: string, integerLength: number, significantDigits: number) {
  const length = significantDigits - integerLength
  if (length > decimal.length) {
    return stripEndZeroes(decimal)
  } else {
    return stripEndZeroes(decimal.substring(0, length))
  }
}

function stripEndZeroes(value: string) {
  return value.replace(/0+$/, '')
}

function toFixed(decimal: string, fixedPrecisionDigits: number) {
  if (fixedPrecisionDigits > decimal.length) {
    return decimal.padEnd(fixedPrecisionDigits, '0')
  } else {
    return decimal.substring(0, fixedPrecisionDigits)
  }
}
