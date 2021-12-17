"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var defaults_1 = require("./defaults");
var src_1 = require("../../../src");
describe('Moonriver Chain', function () {
    it('getChainId', function () {
        chai_1.expect(src_1.Moonriver.chainId).to.equal(1285);
        chai_1.expect(src_1.MoonbaseAlpha.chainId).to.equal(1287);
    });
    it('getChainName', function () {
        chai_1.expect(src_1.Moonriver.chainName).to.eq('Moonriver');
        chai_1.expect(src_1.MoonbaseAlpha.chainName).to.eq('Moonbase Alpha');
    });
    it('isTestChain', function () {
        chai_1.expect(src_1.Moonriver.isTestChain).to.be["false"];
        chai_1.expect(src_1.MoonbaseAlpha.isTestChain).to.be["true"];
    });
    it('isLocalChain', function () {
        chai_1.expect(src_1.Moonriver.isLocalChain).to.be["false"];
        chai_1.expect(src_1.MoonbaseAlpha.isLocalChain).to.be["false"];
    });
    it('getExplorerAddressLink', function () {
        chai_1.expect(src_1.Moonriver.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://blockscout.moonriver.moonbeam.network/address/" + defaults_1.TEST_ADDRESS + "/transactions");
        chai_1.expect(src_1.MoonbaseAlpha.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://moonbase.moonscan.io/address/" + defaults_1.TEST_ADDRESS);
    });
    it('getExplorerTransactionLink', function () {
        chai_1.expect(src_1.Moonriver.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://blockscout.moonriver.moonbeam.network/tx/" + defaults_1.TEST_TX + "/internal-transactions");
        chai_1.expect(src_1.MoonbaseAlpha.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://moonbase.moonscan.io/tx/" + defaults_1.TEST_TX);
    });
});
//# sourceMappingURL=moonriver.test.js.map