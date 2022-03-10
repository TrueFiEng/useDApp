"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var defaults_1 = require("./defaults");
var src_1 = require("../../../src");
describe('Cronos Chain', function () {
    it('getChainId', function () {
        (0, chai_1.expect)(src_1.Cronos.chainId).to.equal(25);
        (0, chai_1.expect)(src_1.CronosTestnet.chainId).to.equal(338);
    });
    it('getChainName', function () {
        (0, chai_1.expect)(src_1.Cronos.chainName).to.eq('Cronos');
        (0, chai_1.expect)(src_1.CronosTestnet.chainName).to.eq('CronosTestnet');
    });
    it('isTestChain', function () {
        (0, chai_1.expect)(src_1.Cronos.isTestChain).to.be["false"];
        (0, chai_1.expect)(src_1.CronosTestnet.isTestChain).to.be["true"];
    });
    it('isLocalChain', function () {
        (0, chai_1.expect)(src_1.Cronos.isLocalChain).to.be["false"];
        (0, chai_1.expect)(src_1.CronosTestnet.isLocalChain).to.be["false"];
    });
    it('getExplorerAddressLink', function () {
        (0, chai_1.expect)(src_1.Cronos.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://cronoscan.com/address/".concat(defaults_1.TEST_ADDRESS));
        (0, chai_1.expect)(src_1.CronosTestnet.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://cronos.crypto.org/explorer/testnet3/address/".concat(defaults_1.TEST_ADDRESS));
    });
    it('getExplorerTransactionLink', function () {
        (0, chai_1.expect)(src_1.Cronos.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://cronoscan.com/tx/".concat(defaults_1.TEST_TX));
        (0, chai_1.expect)(src_1.CronosTestnet.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://cronos.crypto.org/explorer/testnet3/tx/".concat(defaults_1.TEST_TX));
    });
});
//# sourceMappingURL=cronos.test.js.map