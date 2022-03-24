"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var defaults_1 = require("./defaults");
var src_1 = require("../../../src");
describe('Oasis Emerald Chain', function () {
    it('getChainId', function () {
        (0, chai_1.expect)(src_1.OasisEmeraldTestnet.chainId).to.equal(42261);
    });
    it('getChainName', function () {
        (0, chai_1.expect)(src_1.OasisEmeraldTestnet.chainName).to.eq('OasisEmeraldTestnet');
    });
    it('isTestChain', function () {
        (0, chai_1.expect)(src_1.OasisEmeraldTestnet.isTestChain).to.be["false"];
    });
    it('isLocalChain', function () {
        (0, chai_1.expect)(src_1.OasisEmeraldTestnet.isLocalChain).to.be["false"];
    });
    it('getExplorerAddressLink', function () {
        (0, chai_1.expect)(src_1.OasisEmeraldTestnet.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://testnet.explorer.emerald.oasis.dev/address/".concat(defaults_1.TEST_ADDRESS, "/transactions"));
    });
    it('getExplorerTransactionLink', function () {
        (0, chai_1.expect)(src_1.OasisEmeraldTestnet.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://testnet.explorer.emerald.oasis.dev/tx/".concat(defaults_1.TEST_TX, "/internal-transactions"));
    });
});
//# sourceMappingURL=oasis.testnet.test.js.map