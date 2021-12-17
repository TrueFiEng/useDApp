"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var defaults_1 = require("./defaults");
var src_1 = require("../../../src");
describe('xDai Chain', function () {
    it('getChainId', function () {
        chai_1.expect(src_1.xDai.chainId).to.equal(100);
    });
    it('getChainName', function () {
        chai_1.expect(src_1.xDai.chainName).to.eq('xDai');
    });
    it('isTestChain', function () {
        chai_1.expect(src_1.xDai.isTestChain).to.be["false"];
    });
    it('isLocalChain', function () {
        chai_1.expect(src_1.xDai.isLocalChain).to.be["false"];
    });
    it('getExplorerAddressLink', function () {
        chai_1.expect(src_1.xDai.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://blockscout.com/poa/xdai/address/" + defaults_1.TEST_ADDRESS + "/transactions");
    });
    it('getExplorerTransactionLink', function () {
        chai_1.expect(src_1.xDai.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://blockscout.com/poa/xdai/tx/" + defaults_1.TEST_TX + "/internal-transactions");
    });
});
//# sourceMappingURL=xdai.test.js.map