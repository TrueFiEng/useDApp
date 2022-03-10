"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var defaults_1 = require("./defaults");
var src_1 = require("../../../src");
describe('Avalanche Chain', function () {
    it('getChainId', function () {
        (0, chai_1.expect)(src_1.Avalanche.chainId).to.equal(43114);
    });
    it('getChainName', function () {
        (0, chai_1.expect)(src_1.Avalanche.chainName).to.eq('Avalanche');
    });
    it('isTestChain', function () {
        (0, chai_1.expect)(src_1.Avalanche.isTestChain).to.be["false"];
    });
    it('isLocalChain', function () {
        (0, chai_1.expect)(src_1.Avalanche.isLocalChain).to.be["false"];
    });
    it('getExplorerAddressLink', function () {
        (0, chai_1.expect)(src_1.Avalanche.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://snowtrace.io/address/".concat(defaults_1.TEST_ADDRESS));
    });
    it('getExplorerTransactionLink', function () {
        (0, chai_1.expect)(src_1.Avalanche.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://snowtrace.io/tx/".concat(defaults_1.TEST_TX));
    });
});
//# sourceMappingURL=avalanche.test.js.map