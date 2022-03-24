"use strict";
exports.__esModule = true;
exports.Moonbeam = void 0;
exports.Moonbeam = {
    chainId: 1284,
    chainName: 'Moonbeam',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x47152C4dCE75C77Bc9E52F5AAa2a20117971C365',
    getExplorerAddressLink: function (address) { return "https://blockscout.moonbeam.network/address/".concat(address, "/transactions"); },
    getExplorerTransactionLink: function (transactionHash) {
        return "https://blockscout.moonbeam.network/tx/".concat(transactionHash, "/internal-transactions");
    }
};
exports["default"] = { Moonbeam: exports.Moonbeam };
//# sourceMappingURL=moonbeam.js.map