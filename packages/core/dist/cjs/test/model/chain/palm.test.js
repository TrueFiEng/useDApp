"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var defaults_1 = require("./defaults");
var src_1 = require("../../../src");
describe('Palm Chain', function () {
    it('getChainId', function () {
        (0, chai_1.expect)(src_1.Palm.chainId).to.equal(11297108109);
    });
    it('getChainName', function () {
        (0, chai_1.expect)(src_1.Palm.chainName).to.eq('Palm');
    });
    it('isTestChain', function () {
        (0, chai_1.expect)(src_1.Palm.isTestChain).to.be["false"];
    });
    it('isLocalChain', function () {
        (0, chai_1.expect)(src_1.Palm.isLocalChain).to.be["false"];
    });
    it('getExplorerAddressLink', function () {
        (0, chai_1.expect)(src_1.Palm.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://explorer.palm.io/address/".concat(defaults_1.TEST_ADDRESS));
    });
    it('getExplorerTransactionLink', function () {
        (0, chai_1.expect)(src_1.Palm.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://explorer.palm.io/tx/".concat(defaults_1.TEST_TX));
    });
});
describe('PalmTestnet Chain', function () {
    it('getChainId', function () {
        (0, chai_1.expect)(src_1.PalmTestnet.chainId).to.equal(11297108099);
    });
    it('getChainName', function () {
        (0, chai_1.expect)(src_1.PalmTestnet.chainName).to.eq('Palm Testnet');
    });
    it('isTestChain', function () {
        (0, chai_1.expect)(src_1.PalmTestnet.isTestChain).to.be["true"];
    });
    it('isLocalChain', function () {
        (0, chai_1.expect)(src_1.PalmTestnet.isLocalChain).to.be["false"];
    });
    it('getExplorerAddressLink', function () {
        (0, chai_1.expect)(src_1.PalmTestnet.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://explorer.palm-uat.xyz/address/".concat(defaults_1.TEST_ADDRESS));
    });
    it('getExplorerTransactionLink', function () {
        (0, chai_1.expect)(src_1.PalmTestnet.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://explorer.palm-uat.xyz/tx/".concat(defaults_1.TEST_TX));
    });
});
//# sourceMappingURL=palm.test.js.map