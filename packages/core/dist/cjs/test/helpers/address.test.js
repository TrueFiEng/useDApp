"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var address_1 = require("../../src/helpers/address");
describe('addressHelper', function () {
    describe('shortenAddress', function () {
        it('correct address', function () {
            var address = '0x6E9e7A8Fb61b0e1Bc3cB30e6c8E335046267D3A0';
            chai_1.expect(address_1.shortenAddress(address)).to.eq('0x6E9e...D3A0');
        });
        it('address without 0x', function () {
            var address = '6E9e7A8Fb61b0e1Bc3cB30e6c8E335046267D3A0';
            chai_1.expect(address_1.shortenAddress(address)).to.eq('0x6E9e...D3A0');
        });
        it('not checksummed address', function () {
            var address = '0x0c340eb71cd6d0c6d41ccd4732d38b55deb02668';
            chai_1.expect(address_1.shortenAddress(address)).to.eq('0x0C34...2668');
        });
        it('wrong address', function () {
            var address = "i'm not an address";
            chai_1.expect(function () { return address_1.shortenAddress(address); }).to["throw"]("Invalid input, address can't be parsed");
        });
    });
    describe('shortenIfAddress', function () {
        it('correct address', function () {
            var address = '0x6E9e7A8Fb61b0e1Bc3cB30e6c8E335046267D3A0';
            chai_1.expect(address_1.shortenIfAddress(address)).to.eq('0x6E9e...D3A0');
        });
        it('wrong address', function () {
            var address = "i'm not an address";
            chai_1.expect(function () { return address_1.shortenAddress(address); }).to["throw"]("Invalid input, address can't be parsed");
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
                chai_1.expect(address_1.shortenIfAddress(value)).to.eq('');
            });
        });
    });
    describe('addressCompare', function () {
        it('first bigger', function () {
            var address1 = '0x24d53843ce280bbae7d47635039a94b471547fd5';
            var address2 = '0x24d53843ce280bbae7d47635039a94b471547f00';
            chai_1.expect(address_1.compareAddress(address1, address2)).to.eq(1);
        });
        it('second bigger', function () {
            var address1 = '0x004212440ad484f55997750cfae3e13ca1751283';
            var address2 = '0xe24212440ad484f55997750cfae3e13ca1751283';
            chai_1.expect(address_1.compareAddress(address1, address2)).to.eq(-1);
        });
        it('both equal', function () {
            var address1 = '0x8ea9f79f41a20c6a7c724c1d808f9946b7ed620b';
            var address2 = '0x8ea9f79f41a20c6a7c724c1d808f9946b7ed620b';
            chai_1.expect(address_1.compareAddress(address1, address2)).to.eq(0);
        });
        it("can't parse address", function () {
            var address1 = 'im not an address';
            var address2 = '0xb293c3b2b4596824c57ad642ea2da4e146cca4cf';
            chai_1.expect(function () { return address_1.compareAddress(address1, address2); }).to["throw"]("Invalid input, address can't be parsed");
        });
    });
    describe('addressEqual', function () {
        it('equal', function () {
            var address1 = '0x263b2f09cc8754351b6ba9926a7e73ff2302d81f';
            var address2 = '263b2f09cc8754351b6ba9926a7e73ff2302d81f';
            chai_1.expect(address_1.addressEqual(address1, address2)).to.eq(true);
        });
        it('not equal', function () {
            var address1 = '0x3e9b6812364bab40745a7ddef6a1a7a103d81c74';
            var address2 = '0xd1bbe67b8a28985f9a790bd2f13ebb42f0fc679c';
            chai_1.expect(address_1.addressEqual(address1, address2)).to.eq(false);
        });
        it('not an address', function () {
            var address1 = 'im not an address';
            var address2 = '0x2690a21899aaecea9fa832972677128ff8983dd8';
            chai_1.expect(function () { return address_1.addressEqual(address1, address2); }).to["throw"]("Invalid input, address can't be parsed");
        });
    });
});
//# sourceMappingURL=address.test.js.map