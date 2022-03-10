"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var defaults_1 = require("./defaults");
var src_1 = require("../../../src");
describe('BSC Chain', function () {
    it('getChainId', function () {
        (0, chai_1.expect)(src_1.BSC.chainId).to.equal(56);
        (0, chai_1.expect)(src_1.BSCTestnet.chainId).to.equal(97);
    });
    it('getChainName', function () {
        (0, chai_1.expect)(src_1.BSC.chainName).to.eq('BSC');
        (0, chai_1.expect)(src_1.BSCTestnet.chainName).to.eq('BSCTestnet');
    });
    it('isTestChain', function () {
        (0, chai_1.expect)(src_1.BSC.isTestChain).to.be["false"];
        (0, chai_1.expect)(src_1.BSCTestnet.isTestChain).to.be["true"];
    });
    it('isLocalChain', function () {
        (0, chai_1.expect)(src_1.BSC.isLocalChain).to.be["false"];
        (0, chai_1.expect)(src_1.BSCTestnet.isLocalChain).to.be["false"];
    });
    it('getExplorerAddressLink', function () {
        (0, chai_1.expect)(src_1.BSC.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://bscscan.com/address/".concat(defaults_1.TEST_ADDRESS));
        (0, chai_1.expect)(src_1.BSCTestnet.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://testnet.bscscan.com/address/".concat(defaults_1.TEST_ADDRESS));
    });
    it('getExplorerTransactionLink', function () {
        (0, chai_1.expect)(src_1.BSC.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://bscscan.com/tx/".concat(defaults_1.TEST_TX));
        (0, chai_1.expect)(src_1.BSCTestnet.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://testnet.bscscan.com/tx/".concat(defaults_1.TEST_TX));
    });
});
//# sourceMappingURL=bsc.test.js.map