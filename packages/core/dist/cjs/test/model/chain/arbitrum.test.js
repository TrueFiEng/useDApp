"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var defaults_1 = require("./defaults");
var src_1 = require("../../../src");
describe('Arbitrum Chain', function () {
    it('getChainId', function () {
        (0, chai_1.expect)(src_1.Arbitrum.chainId).to.equal(42161);
        (0, chai_1.expect)(src_1.ArbitrumRinkeby.chainId).to.equal(421611);
    });
    it('getChainName', function () {
        (0, chai_1.expect)(src_1.Arbitrum.chainName).to.eq('Arbitrum');
        (0, chai_1.expect)(src_1.ArbitrumRinkeby.chainName).to.eq('ArbitrumRinkeby');
    });
    it('isTestChain', function () {
        (0, chai_1.expect)(src_1.Arbitrum.isTestChain).to.be["false"];
        (0, chai_1.expect)(src_1.ArbitrumRinkeby.isTestChain).to.be["true"];
    });
    it('isLocalChain', function () {
        (0, chai_1.expect)(src_1.Arbitrum.isLocalChain).to.be["false"];
        (0, chai_1.expect)(src_1.ArbitrumRinkeby.isLocalChain).to.be["false"];
    });
    it('getExplorerAddressLink', function () {
        (0, chai_1.expect)(src_1.Arbitrum.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://arbiscan.io/address/".concat(defaults_1.TEST_ADDRESS));
        (0, chai_1.expect)(src_1.ArbitrumRinkeby.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://testnet.arbiscan.io/address/".concat(defaults_1.TEST_ADDRESS));
    });
    it('getExplorerTransactionLink', function () {
        (0, chai_1.expect)(src_1.Arbitrum.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://arbiscan.io/tx/".concat(defaults_1.TEST_TX));
        (0, chai_1.expect)(src_1.ArbitrumRinkeby.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://testnet.arbiscan.io/tx/".concat(defaults_1.TEST_TX));
    });
});
//# sourceMappingURL=arbitrum.test.js.map