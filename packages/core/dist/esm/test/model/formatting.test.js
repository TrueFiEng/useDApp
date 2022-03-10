import { expect } from 'chai';
import { DEFAULT_OPTIONS, formatCurrency } from '../../src/model/formatting';
describe('formatCurrency', () => {
    describe('input validation', () => {
        it('only allows decimal strings', () => {
            expect(() => formatCurrency(DEFAULT_OPTIONS, 'some string')).to.throw(TypeError);
            expect(() => formatCurrency(DEFAULT_OPTIONS, 'deadbeef')).to.throw(TypeError);
            expect(() => formatCurrency(DEFAULT_OPTIONS, '1A2B')).to.throw(TypeError);
        });
    });
    describe('separators', () => {
        const cases = [
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
        for (const [decimals, input, expected] of cases) {
            it(`formats ${input} as ${expected}, with ${decimals} decimals`, () => {
                const options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), { decimals });
                const output = formatCurrency(options, input);
                expect(output).to.equal(expected);
            });
        }
        it('can be customised', () => {
            const output = formatCurrency(Object.assign(Object.assign({}, DEFAULT_OPTIONS), { decimals: 5, thousandSeparator: ' ', decimalSeparator: ',' }), '1234567890987654321');
            expect(output).to.equal('12 345 678 909 876,54321');
        });
    });
    describe('significantDigits', () => {
        const cases = [
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
        for (const [significant, decimals, input, expected] of cases) {
            it(`formats ${input} as ${expected}, with d=${decimals}, s=${significant}`, () => {
                const options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), { decimals, significantDigits: significant });
                const output = formatCurrency(options, input);
                expect(output).to.equal(expected);
            });
        }
    });
    describe('fixedPrecisionDigits', () => {
        const cases = [
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
        for (const [fixed, decimals, input, expected] of cases) {
            it(`formats ${input} as ${expected}, with d=${decimals}, f=${fixed}`, () => {
                const options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), { decimals, fixedPrecisionDigits: fixed, useFixedPrecision: true });
                const output = formatCurrency(options, input);
                expect(output).to.equal(expected);
            });
        }
    });
    describe('prefix and suffix', () => {
        it('applies prefix', () => {
            const options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), { prefix: '$' });
            const output = formatCurrency(options, '123');
            expect(output).to.equal('$123');
        });
        it('applies suffix', () => {
            const options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), { suffix: ' zł' });
            const output = formatCurrency(options, '123');
            expect(output).to.equal('123 zł');
        });
        it('applies both', () => {
            const options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), { prefix: '€', suffix: ' EUR' });
            const output = formatCurrency(options, '123');
            expect(output).to.equal('€123 EUR');
        });
    });
});
//# sourceMappingURL=formatting.test.js.map