"use strict";
exports.__esModule = true;
exports.BSCTestnet = exports.BSC = void 0;
exports.BSC = {
    chainId: 56,
    chainName: 'BSC',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x41263cba59eb80dc200f3e2544eda4ed6a90e76c',
    getExplorerAddressLink: function (address) { return "https://bscscan.com/address/".concat(address); },
    getExplorerTransactionLink: function (transactionHash) { return "https://bscscan.com/tx/".concat(transactionHash); }
};
exports.BSCTestnet = {
    chainId: 97,
    chainName: 'BSCTestnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C',
    getExplorerAddressLink: function (address) { return "https://testnet.bscscan.com/address/".concat(address); },
    getExplorerTransactionLink: function (transactionHash) { return "https://testnet.bscscan.com/tx/".concat(transactionHash); }
};
exports["default"] = {
    BSC: exports.BSC,
    BSCTestnet: exports.BSCTestnet
};
//# sourceMappingURL=bsc.js.map