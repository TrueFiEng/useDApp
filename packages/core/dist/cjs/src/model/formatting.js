"use strict";
exports.__esModule = true;
exports.formatCurrency = exports.DEFAULT_OPTIONS = void 0;
exports.DEFAULT_OPTIONS = {
    decimals: 0,
    thousandSeparator: ',',
    decimalSeparator: '.',
    significantDigits: Infinity,
    useFixedPrecision: false,
    fixedPrecisionDigits: 0,
    prefix: '',
    suffix: ''
};
var INPUT_REGEX = /^\d*$/;
function formatCurrency(options, value) {
    if (!INPUT_REGEX.test(value)) {
        throw new TypeError('Invalid input, decimal string expected.');
    }
    var number = formatNumber(options, value);
    return [options.prefix, number, options.suffix].join('');
}
exports.formatCurrency = formatCurrency;
function formatNumber(options, value) {
    var integer = getIntegerPart(value, options.decimals);
    var thousands = splitThousands(integer, options.thousandSeparator);
    var decimal = getDecimalPart(value, options.decimals);
    var digits = options.useFixedPrecision
        ? toFixed(decimal, options.fixedPrecisionDigits)
        : toSignificant(decimal, integer.length, options.significantDigits);
    return joinDecimals(thousands, digits, options.decimalSeparator);
}
function getIntegerPart(value, decimals) {
    if (value.length <= decimals) {
        return '0';
    }
    else {
        var fragment = value.substring(0, value.length - decimals);
        return stripFrontZeroes(fragment);
    }
}
function stripFrontZeroes(value) {
    var stripped = value.replace(/^0+/, '');
    return stripped || '0';
}
function splitThousands(value, separator) {
    var count = value.length / 3;
    var resultValue = value.split('');
    for (var i = 1; i < count; i++) {
        resultValue.splice(-4 * i + 1, 0, separator);
    }
    return resultValue.join('');
}
function getDecimalPart(value, decimals) {
    if (value.length <= decimals) {
        return value.padStart(decimals, '0');
    }
    else {
        return value.substring(value.length - decimals);
    }
}
function joinDecimals(integer, decimals, separator) {
    if (!decimals) {
        return integer;
    }
    else {
        return "" + integer + separator + decimals;
    }
}
function toSignificant(decimal, integerLength, significantDigits) {
    var length = significantDigits - integerLength;
    if (length > decimal.length) {
        return stripEndZeroes(decimal);
    }
    else {
        return stripEndZeroes(decimal.substring(0, length));
    }
}
function stripEndZeroes(value) {
    return value.replace(/0+$/, '');
}
function toFixed(decimal, fixedPrecisionDigits) {
    if (fixedPrecisionDigits > decimal.length) {
        return decimal.padEnd(fixedPrecisionDigits, '0');
    }
    else {
        return decimal.substring(0, fixedPrecisionDigits);
    }
}
//# sourceMappingURL=formatting.js.map