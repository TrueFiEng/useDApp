"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var constants_1 = require("@ethersproject/constants");
var src_1 = require("../../src");
describe('Currency', function () {
    it('can be constructed', function () {
        var zuckBucks = new src_1.Currency('Zuck Bucks', 'ZB', 2, {
            suffix: 'ZB'
        });
        var formatted = zuckBucks.format('1234');
        chai_1.expect(formatted).to.equal('12.34ZB');
    });
    it('FiatCurrency', function () {
        var dollar = new src_1.FiatCurrency('United States Dollar', 'USD', 2, {
            prefix: '$',
            suffix: ' USD'
        });
        var formatted = dollar.format('1234');
        chai_1.expect(formatted).to.equal('$12.34 USD');
    });
    it('NativeCurrency', function () {
        var ether = new src_1.NativeCurrency('Ether', 'ETH', src_1.ChainId.Mainnet);
        var formatted = ether.format('123'.concat('0'.repeat(18)));
        chai_1.expect(formatted).to.equal('123 ETH');
    });
    it('Token', function () {
        var token = new src_1.Token('Fake Dai', 'FDI', src_1.ChainId.Mainnet, constants_1.AddressZero);
        var formatted = token.format('123'.concat('0'.repeat(18)));
        chai_1.expect(formatted).to.equal('123 FDI');
    });
});
//# sourceMappingURL=Currency.test.js.map