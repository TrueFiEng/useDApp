"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var defaults_1 = require("./defaults");
var src_1 = require("../../../src");
describe('Oasis Emerald Chain', function () {
    it('getChainId', function () {
        (0, chai_1.expect)(src_1.OasisEmerald.chainId).to.equal(42262);
    });
    it('getChainName', function () {
        (0, chai_1.expect)(src_1.OasisEmerald.chainName).to.eq('OasisEmerald');
    });
    it('isTestChain', function () {
        (0, chai_1.expect)(src_1.OasisEmerald.isTestChain).to.be["false"];
    });
    it('isLocalChain', function () {
        (0, chai_1.expect)(src_1.OasisEmerald.isLocalChain).to.be["false"];
    });
    it('getExplorerAddressLink', function () {
        (0, chai_1.expect)(src_1.OasisEmerald.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://explorer.emerald.oasis.dev/address/".concat(defaults_1.TEST_ADDRESS, "/transactions"));
    });
    it('getExplorerTransactionLink', function () {
        (0, chai_1.expect)(src_1.OasisEmerald.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://explorer.emerald.oasis.dev/tx/".concat(defaults_1.TEST_TX, "/internal-transactions"));
    });
});
//# sourceMappingURL=oasis.test.js.map