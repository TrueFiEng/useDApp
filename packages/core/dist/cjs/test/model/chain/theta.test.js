"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var defaults_1 = require("./defaults");
var src_1 = require("../../../src");
describe('Theta Chain', function () {
    it('getChainId', function () {
        (0, chai_1.expect)(src_1.Theta.chainId).to.equal(361);
        (0, chai_1.expect)(src_1.ThetaTestnet.chainId).to.equal(365);
    });
    it('getChainName', function () {
        (0, chai_1.expect)(src_1.Theta.chainName).to.eq('Theta');
        (0, chai_1.expect)(src_1.ThetaTestnet.chainName).to.eq('ThetaTestnet');
    });
    it('isTestChain', function () {
        (0, chai_1.expect)(src_1.Theta.isTestChain).to.be["false"];
        (0, chai_1.expect)(src_1.ThetaTestnet.isTestChain).to.be["true"];
    });
    it('isLocalChain', function () {
        (0, chai_1.expect)(src_1.Theta.isLocalChain).to.be["false"];
        (0, chai_1.expect)(src_1.ThetaTestnet.isLocalChain).to.be["false"];
    });
    it('getExplorerAddressLink', function () {
        (0, chai_1.expect)(src_1.Theta.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://explorer.thetatoken.org/address/".concat(defaults_1.TEST_ADDRESS));
        (0, chai_1.expect)(src_1.ThetaTestnet.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://testnet-explorer.thetatoken.org/address/".concat(defaults_1.TEST_ADDRESS));
    });
    it('getExplorerTransactionLink', function () {
        (0, chai_1.expect)(src_1.Theta.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://explorer.thetatoken.org/tx/".concat(defaults_1.TEST_TX));
        (0, chai_1.expect)(src_1.ThetaTestnet.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://testnet-explorer.thetatoken.org/tx/".concat(defaults_1.TEST_TX));
    });
});
//# sourceMappingURL=theta.test.js.map