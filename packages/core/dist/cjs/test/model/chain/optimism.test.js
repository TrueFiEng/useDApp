"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var defaults_1 = require("./defaults");
var src_1 = require("../../../src");
describe('Optimism Chain', function () {
    it('getChainId', function () {
        (0, chai_1.expect)(src_1.Optimism.chainId).to.equal(10);
        (0, chai_1.expect)(src_1.OptimismKovan.chainId).to.equal(69);
    });
    it('getChainName', function () {
        (0, chai_1.expect)(src_1.Optimism.chainName).to.eq('Optimism');
        (0, chai_1.expect)(src_1.OptimismKovan.chainName).to.eq('OptimismKovan');
    });
    it('isTestChain', function () {
        (0, chai_1.expect)(src_1.Optimism.isTestChain).to.be["false"];
        (0, chai_1.expect)(src_1.OptimismKovan.isTestChain).to.be["true"];
    });
    it('isLocalChain', function () {
        (0, chai_1.expect)(src_1.Optimism.isLocalChain).to.be["false"];
        (0, chai_1.expect)(src_1.OptimismKovan.isLocalChain).to.be["false"];
    });
    it('getExplorerAddressLink', function () {
        (0, chai_1.expect)(src_1.Optimism.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://optimistic.etherscan.io/address/".concat(defaults_1.TEST_ADDRESS));
        (0, chai_1.expect)(src_1.OptimismKovan.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://kovan-optimistic.etherscan.io/address/".concat(defaults_1.TEST_ADDRESS));
    });
    it('getExplorerTransactionLink', function () {
        (0, chai_1.expect)(src_1.Optimism.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://optimistic.etherscan.io/tx/".concat(defaults_1.TEST_TX));
        (0, chai_1.expect)(src_1.OptimismKovan.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://kovan-optimistic.etherscan.io/tx/".concat(defaults_1.TEST_TX));
    });
});
//# sourceMappingURL=optimism.test.js.map