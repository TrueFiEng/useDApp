"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var defaults_1 = require("./defaults");
var src_1 = require("../../../src");
describe('Palm Chain', function () {
    it('getChainId', function () {
        chai_1.expect(src_1.Palm.chainId).to.equal(11297108109);
    });
    it('getChainName', function () {
        chai_1.expect(src_1.Palm.chainName).to.eq('Palm');
    });
    it('isTestChain', function () {
        chai_1.expect(src_1.Palm.isTestChain).to.be["false"];
    });
    it('isLocalChain', function () {
        chai_1.expect(src_1.Palm.isLocalChain).to.be["false"];
    });
    it('getExplorerAddressLink', function () {
        chai_1.expect(src_1.Palm.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://explorer.palm.io/address/" + defaults_1.TEST_ADDRESS);
    });
    it('getExplorerTransactionLink', function () {
        chai_1.expect(src_1.Palm.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://explorer.palm.io/tx/" + defaults_1.TEST_TX);
    });
});
//# sourceMappingURL=palm.test.js.map