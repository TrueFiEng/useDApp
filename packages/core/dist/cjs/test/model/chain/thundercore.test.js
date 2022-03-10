"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var defaults_1 = require("./defaults");
var src_1 = require("../../../src");
describe('ThunderCore Chain', function () {
    it('getChainId', function () {
        (0, chai_1.expect)(src_1.ThunderCore.chainId).to.equal(108);
        (0, chai_1.expect)(src_1.ThunderCoreTestnet.chainId).to.equal(18);
    });
    it('getChainName', function () {
        (0, chai_1.expect)(src_1.ThunderCore.chainName).to.eq('ThunderCore Mainnet');
        (0, chai_1.expect)(src_1.ThunderCoreTestnet.chainName).to.eq('ThunderCore Testnet');
    });
    it('isTestChain', function () {
        (0, chai_1.expect)(src_1.ThunderCore.isTestChain).to.be["false"];
        (0, chai_1.expect)(src_1.ThunderCoreTestnet.isTestChain).to.be["true"];
    });
    it('isLocalChain', function () {
        (0, chai_1.expect)(src_1.ThunderCore.isLocalChain).to.be["false"];
        (0, chai_1.expect)(src_1.ThunderCoreTestnet.isLocalChain).to.be["false"];
    });
    it('getExplorerAddressLink', function () {
        (0, chai_1.expect)(src_1.ThunderCore.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://viewblock.io/thundercore/address/".concat(defaults_1.TEST_ADDRESS));
        (0, chai_1.expect)(src_1.ThunderCoreTestnet.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://explorer-testnet.thundercore.com/address/".concat(defaults_1.TEST_ADDRESS));
    });
    it('getExplorerTransactionLink', function () {
        (0, chai_1.expect)(src_1.ThunderCore.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://viewblock.io/thundercore/tx/".concat(defaults_1.TEST_TX));
        (0, chai_1.expect)(src_1.ThunderCoreTestnet.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://explorer-testnet.thundercore.com/tx/".concat(defaults_1.TEST_TX));
    });
});
//# sourceMappingURL=thundercore.test.js.map