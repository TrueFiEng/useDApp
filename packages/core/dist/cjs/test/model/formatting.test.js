"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var chai_1 = require("chai");
var formatting_1 = require("../../src/model/formatting");
describe('formatCurrency', function () {
    describe('input validation', function () {
        it('only allows decimal strings', function () {
            chai_1.expect(function () { return formatting_1.formatCurrency(formatting_1.DEFAULT_OPTIONS, 'some string'); }).to["throw"](TypeError);
            chai_1.expect(function () { return formatting_1.formatCurrency(formatting_1.DEFAULT_OPTIONS, 'deadbeef'); }).to["throw"](TypeError);
            chai_1.expect(function () { return formatting_1.formatCurrency(formatting_1.DEFAULT_OPTIONS, '1A2B'); }).to["throw"](TypeError);
        });
    });
    describe('separators', function () {
        var cases = [
            [0, '1', '1'],
            [0, '000000', '0'],
            [0, '100', '100'],
            [0, '1000', '1,000'],
            [0, '4321', '4,321'],
            [0, '54321', '54,321'],
            [0, '654321', '654,321'],
            [0, '7654321', '7,654,321'],
            [0, '1000000000000000', '1,000,000,000,000,000'],
            [2, '2137', '21.37'],
            [3, '100001', '100.001'],
            [8, '1098765432101234', '10,987,654.32101234'],
            [0, '', '0'],
            [4, '', '0'],
        ];
        var _loop_1 = function (decimals, input, expected) {
            it("formats " + input + " as " + expected + ", with " + decimals + " decimals", function () {
                var options = __assign(__assign({}, formatting_1.DEFAULT_OPTIONS), { decimals: decimals });
                var output = formatting_1.formatCurrency(options, input);
                chai_1.expect(output).to.equal(expected);
            });
        };
        for (var _i = 0, cases_1 = cases; _i < cases_1.length; _i++) {
            var _a = cases_1[_i], decimals = _a[0], input = _a[1], expected = _a[2];
            _loop_1(decimals, input, expected);
        }
        it('can be customised', function () {
            var output = formatting_1.formatCurrency(__assign(__assign({}, formatting_1.DEFAULT_OPTIONS), { decimals: 5, thousandSeparator: ' ', decimalSeparator: ',' }), '1234567890987654321');
            chai_1.expect(output).to.equal('12 345 678 909 876,54321');
        });
    });
    describe('significantDigits', function () {
        var cases = [
            [0, 0, '123456', '123,456'],
            [0, 3, '123456', '123'],
            [0, 0, '0', '0'],
            [6, 2, '123456', '1,234.56'],
            [6, 2, '123450', '1,234.5'],
            [6, 2, '123400', '1,234'],
            [6, 2, '1234567', '12,345.6'],
            [6, 2, '12345678', '123,456'],
            [6, 2, '123456789', '1,234,567'],
        ];
        var _loop_2 = function (significant, decimals, input, expected) {
            it("formats " + input + " as " + expected + ", with d=" + decimals + ", s=" + significant, function () {
                var options = __assign(__assign({}, formatting_1.DEFAULT_OPTIONS), { decimals: decimals, significantDigits: significant });
                var output = formatting_1.formatCurrency(options, input);
                chai_1.expect(output).to.equal(expected);
            });
        };
        for (var _i = 0, cases_2 = cases; _i < cases_2.length; _i++) {
            var _a = cases_2[_i], significant = _a[0], decimals = _a[1], input = _a[2], expected = _a[3];
            _loop_2(significant, decimals, input, expected);
        }
    });
    describe('fixedPrecisionDigits', function () {
        var cases = [
            [0, 0, '123456', '123,456'],
            [0, 3, '123456', '123'],
            [0, 0, '0', '0'],
            [3, 0, '123456', '123,456.000'],
            [3, 1, '123456', '12,345.600'],
            [3, 2, '123456', '1,234.560'],
            [3, 3, '123456', '123.456'],
            [3, 4, '123456', '12.345'],
            [3, 5, '123456', '1.234'],
            [3, 6, '123456', '0.123'],
            [3, 7, '123456', '0.012'],
        ];
        var _loop_3 = function (fixed, decimals, input, expected) {
            it("formats " + input + " as " + expected + ", with d=" + decimals + ", f=" + fixed, function () {
                var options = __assign(__assign({}, formatting_1.DEFAULT_OPTIONS), { decimals: decimals, fixedPrecisionDigits: fixed, useFixedPrecision: true });
                var output = formatting_1.formatCurrency(options, input);
                chai_1.expect(output).to.equal(expected);
            });
        };
        for (var _i = 0, cases_3 = cases; _i < cases_3.length; _i++) {
            var _a = cases_3[_i], fixed = _a[0], decimals = _a[1], input = _a[2], expected = _a[3];
            _loop_3(fixed, decimals, input, expected);
        }
    });
    describe('prefix and suffix', function () {
        it('applies prefix', function () {
            var options = __assign(__assign({}, formatting_1.DEFAULT_OPTIONS), { prefix: '$' });
            var output = formatting_1.formatCurrency(options, '123');
            chai_1.expect(output).to.equal('$123');
        });
        it('applies suffix', function () {
            var options = __assign(__assign({}, formatting_1.DEFAULT_OPTIONS), { suffix: ' zł' });
            var output = formatting_1.formatCurrency(options, '123');
            chai_1.expect(output).to.equal('123 zł');
        });
        it('applies both', function () {
            var options = __assign(__assign({}, formatting_1.DEFAULT_OPTIONS), { prefix: '€', suffix: ' EUR' });
            var output = formatting_1.formatCurrency(options, '123');
            chai_1.expect(output).to.equal('€123 EUR');
        });
    });
});
//# sourceMappingURL=formatting.test.js.map