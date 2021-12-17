"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var defaults_1 = require("./defaults");
var src_1 = require("../../../src");
describe('Songbird Chain', function () {
    it('getChainId', function () {
        chai_1.expect(src_1.Songbird.chainId).to.equal(19);
    });
    it('getChainName', function () {
        chai_1.expect(src_1.Songbird.chainName).to.eq('Songbird');
    });
    it('isTestChain', function () {
        chai_1.expect(src_1.Songbird.isTestChain).to.be["false"];
    });
    it('isLocalChain', function () {
        chai_1.expect(src_1.Songbird.isLocalChain).to.be["false"];
    });
    it('getExplorerAddressLink', function () {
        chai_1.expect(src_1.Songbird.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://songbird-explorer.flare.network/address/" + defaults_1.TEST_ADDRESS);
    });
    it('getExplorerTransactionLink', function () {
        chai_1.expect(src_1.Songbird.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://songbird-explorer.flare.network/tx/" + defaults_1.TEST_TX);
    });
});
//# sourceMappingURL=songbird.test.js.map