"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var defaults_1 = require("./defaults");
var src_1 = require("../../../src");
describe('Theta Chain', function () {
    it('getChainId', function () {
        chai_1.expect(src_1.Theta.chainId).to.equal(361);
        chai_1.expect(src_1.ThetaTestnet.chainId).to.equal(365);
    });
    it('getChainName', function () {
        chai_1.expect(src_1.Theta.chainName).to.eq('Theta');
        chai_1.expect(src_1.ThetaTestnet.chainName).to.eq('ThetaTestnet');
    });
    it('isTestChain', function () {
        chai_1.expect(src_1.Theta.isTestChain).to.be["false"];
        chai_1.expect(src_1.ThetaTestnet.isTestChain).to.be["true"];
    });
    it('isLocalChain', function () {
        chai_1.expect(src_1.Theta.isLocalChain).to.be["false"];
        chai_1.expect(src_1.ThetaTestnet.isLocalChain).to.be["false"];
    });
    it('getExplorerAddressLink', function () {
        chai_1.expect(src_1.Theta.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://explorer.thetatoken.org/address/" + defaults_1.TEST_ADDRESS);
        chai_1.expect(src_1.ThetaTestnet.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://testnet-explorer.thetatoken.org/address/" + defaults_1.TEST_ADDRESS);
    });
    it('getExplorerTransactionLink', function () {
        chai_1.expect(src_1.Theta.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://explorer.thetatoken.org/tx/" + defaults_1.TEST_TX);
        chai_1.expect(src_1.ThetaTestnet.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://testnet-explorer.thetatoken.org/tx/" + defaults_1.TEST_TX);
    });
});
//# sourceMappingURL=theta.test.js.map