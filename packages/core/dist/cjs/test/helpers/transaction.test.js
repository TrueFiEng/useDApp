"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var src_1 = require("../../src");
describe('transactionHelpers', function () {
    describe('shortenTransactionHash', function () {
        it('correct hash', function () {
            var hash = '0x19b22589c0e4340c03da1a0732e452048d3c2b851c99cf2bac7d3bdc8f1f9e37';
            chai_1.expect(src_1.shortenTransactionHash(hash)).to.eq('0x19b2...9e37');
        });
        it('hash length equal to 10', function () {
            var hash = '1234567890';
            chai_1.expect(src_1.shortenTransactionHash(hash)).to.eq('123456...7890');
        });
        it('hash too short', function () {
            var hash = 'abcd';
            chai_1.expect(function () { return src_1.shortenTransactionHash(hash); }).to["throw"]('Invalid input, transaction hash need to have at least 10 characters');
        });
    });
    describe('shortenIfTransactionHash', function () {
        it('correct hash', function () {
            var hash = '0x19b22589c0e4340c03da1a0732e452048d3c2b851c99cf2bac7d3bdc8f1f9e37';
            chai_1.expect(src_1.shortenTransactionHash(hash)).to.eq('0x19b2...9e37');
        });
        var testCases = [
            { description: '0', value: 0 },
            { description: 'null', value: null },
            { description: 'undefined', value: undefined },
            { description: 'empty string', value: '' },
            { description: 'false', value: false },
        ];
        testCases.forEach(function (_a) {
            var description = _a.description, value = _a.value;
            it(description, function () {
                chai_1.expect(src_1.shortenIfTransactionHash(value)).to.eq('');
            });
        });
    });
});
//# sourceMappingURL=transaction.test.js.map