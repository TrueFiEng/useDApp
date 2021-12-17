"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var defaults_1 = require("./defaults");
var src_1 = require("../../../src");
describe('Ethereum Chain', function () {
    it('getChainId', function () {
        chai_1.expect(src_1.Mainnet.chainId).to.equal(1);
        chai_1.expect(src_1.Ropsten.chainId).to.equal(3);
        chai_1.expect(src_1.Rinkeby.chainId).to.equal(4);
        chai_1.expect(src_1.Goerli.chainId).to.equal(5);
        chai_1.expect(src_1.Kovan.chainId).to.equal(42);
    });
    it('getChainName', function () {
        chai_1.expect(src_1.Mainnet.chainName).to.eq('Mainnet');
        chai_1.expect(src_1.Ropsten.chainName).to.eq('Ropsten');
        chai_1.expect(src_1.Kovan.chainName).to.eq('Kovan');
        chai_1.expect(src_1.Rinkeby.chainName).to.eq('Rinkeby');
        chai_1.expect(src_1.Goerli.chainName).to.eq('Goerli');
    });
    it('isTestChain', function () {
        chai_1.expect(src_1.Mainnet.isTestChain).to.be["false"];
        chai_1.expect(src_1.Ropsten.isTestChain).to.be["true"];
        chai_1.expect(src_1.Kovan.isTestChain).to.be["true"];
        chai_1.expect(src_1.Rinkeby.isTestChain).to.be["true"];
        chai_1.expect(src_1.Goerli.isTestChain).to.be["true"];
    });
    it('isLocalChain', function () {
        chai_1.expect(src_1.Mainnet.isLocalChain).to.be["false"];
        chai_1.expect(src_1.Ropsten.isLocalChain).to.be["false"];
        chai_1.expect(src_1.Kovan.isLocalChain).to.be["false"];
        chai_1.expect(src_1.Rinkeby.isLocalChain).to.be["false"];
        chai_1.expect(src_1.Goerli.isLocalChain).to.be["false"];
    });
    it('getExplorerAddressLink', function () {
        chai_1.expect(src_1.Mainnet.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://etherscan.io/address/" + defaults_1.TEST_ADDRESS);
        chai_1.expect(src_1.Ropsten.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://ropsten.etherscan.io/address/" + defaults_1.TEST_ADDRESS);
        chai_1.expect(src_1.Kovan.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://kovan.etherscan.io/address/" + defaults_1.TEST_ADDRESS);
        chai_1.expect(src_1.Rinkeby.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://rinkeby.etherscan.io/address/" + defaults_1.TEST_ADDRESS);
        chai_1.expect(src_1.Goerli.getExplorerAddressLink(defaults_1.TEST_ADDRESS)).to.eq("https://goerli.etherscan.io/address/" + defaults_1.TEST_ADDRESS);
    });
    it('getExplorerTransactionLink', function () {
        chai_1.expect(src_1.Mainnet.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://etherscan.io/tx/" + defaults_1.TEST_TX);
        chai_1.expect(src_1.Ropsten.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://ropsten.etherscan.io/tx/" + defaults_1.TEST_TX);
        chai_1.expect(src_1.Kovan.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://kovan.etherscan.io/tx/" + defaults_1.TEST_TX);
        chai_1.expect(src_1.Rinkeby.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://rinkeby.etherscan.io/tx/" + defaults_1.TEST_TX);
        chai_1.expect(src_1.Goerli.getExplorerTransactionLink(defaults_1.TEST_TX)).to.eq("https://goerli.etherscan.io/tx/" + defaults_1.TEST_TX);
    });
});
//# sourceMappingURL=ethereum.test.js.map