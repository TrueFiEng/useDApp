"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var defaults_1 = require("./defaults");
var src_1 = require("../../../src");
describe('Fantom Chain', function () {
    it('getChainId', function () {
        chai_1.expect(src_1.Fantom.chainId).to.equal(250);
    });
    it('getChainName', function () {
        chai_1.expect(src_1.Fantom.chainName).to.eq('Fantom');
    });
    it('isTestChain', function () {
        chai_1.expect(src_1.Fantom.isTestChain).to.be["false"];
    });
    it('isLocalChain', function () {
        chai_1.expect(src_1.Fantom.isLocalChain).to.be["false"];
    });
    it('getExplorerAddressLink', function () {
        chai_1.expect(src_1.Fantom.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://ftmscan.com/address/" + defaults_1.TEST_ADDRESS);
    });
    it('getExplorerTransactionLink', function () {
        chai_1.expect(src_1.Fantom.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://ftmscan.com/tx/" + defaults_1.TEST_TX);
    });
});
//# sourceMappingURL=fantom.test.js.map