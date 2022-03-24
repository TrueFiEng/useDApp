"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var defaults_1 = require("./defaults");
var src_1 = require("../../../src");
describe('Moonriver Chain', function () {
    it('getChainId', function () {
        (0, chai_1.expect)(src_1.Moonriver.chainId).to.equal(1285);
        (0, chai_1.expect)(src_1.MoonbaseAlpha.chainId).to.equal(1287);
    });
    it('getChainName', function () {
        (0, chai_1.expect)(src_1.Moonriver.chainName).to.eq('Moonriver');
        (0, chai_1.expect)(src_1.MoonbaseAlpha.chainName).to.eq('Moonbase Alpha');
    });
    it('isTestChain', function () {
        (0, chai_1.expect)(src_1.Moonriver.isTestChain).to.be["false"];
        (0, chai_1.expect)(src_1.MoonbaseAlpha.isTestChain).to.be["true"];
    });
    it('isLocalChain', function () {
        (0, chai_1.expect)(src_1.Moonriver.isLocalChain).to.be["false"];
        (0, chai_1.expect)(src_1.MoonbaseAlpha.isLocalChain).to.be["false"];
    });
    it('getExplorerAddressLink', function () {
        (0, chai_1.expect)(src_1.Moonriver.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://blockscout.moonriver.moonbeam.network/address/".concat(defaults_1.TEST_ADDRESS, "/transactions"));
        (0, chai_1.expect)(src_1.MoonbaseAlpha.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://moonbase.moonscan.io/address/".concat(defaults_1.TEST_ADDRESS));
    });
    it('getExplorerTransactionLink', function () {
        (0, chai_1.expect)(src_1.Moonriver.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://blockscout.moonriver.moonbeam.network/tx/".concat(defaults_1.TEST_TX, "/internal-transactions"));
        (0, chai_1.expect)(src_1.MoonbaseAlpha.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://moonbase.moonscan.io/tx/".concat(defaults_1.TEST_TX));
    });
});
//# sourceMappingURL=moonriver.test.js.map