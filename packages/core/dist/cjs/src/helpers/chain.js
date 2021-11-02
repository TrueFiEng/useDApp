"use strict";
exports.__esModule = true;
exports.isLocalChain = exports.isTestChain = exports.getChainName = exports.getExplorerTransactionLink = exports.getExplorerAddressLink = void 0;
var constants_1 = require("../constants");
function etherscanNetworkPrefix(chainId) {
    switch (chainId) {
        case constants_1.ChainId.Mainnet:
            return "";
        case constants_1.ChainId.Ropsten:
        case constants_1.ChainId.Kovan:
        case constants_1.ChainId.Rinkeby:
        case constants_1.ChainId.Goerli:
            return getChainName(chainId).toLocaleLowerCase() + '.';
    }
}
function getExplorerAddressLink(address, chainId) {
    switch (chainId) {
        case constants_1.ChainId.Mainnet:
        case constants_1.ChainId.Ropsten:
        case constants_1.ChainId.Kovan:
        case constants_1.ChainId.Rinkeby:
        case constants_1.ChainId.Goerli:
            return "https://" + etherscanNetworkPrefix(chainId) + "etherscan.io/address/" + address;
        case constants_1.ChainId.BSC:
            return "https://bscscan.com/address/" + address;
        case constants_1.ChainId.BSCTestnet:
            return "https://testnet.bscscan.com/address/" + address;
        case constants_1.ChainId.xDai:
            return "https://blockscout.com/poa/xdai/address/" + address + "/transactions";
        case constants_1.ChainId.Polygon:
            return "https://explorer-mainnet.maticvigil.com/address/" + address + "/transactions";
        case constants_1.ChainId.Mumbai:
            return "https://explorer-mumbai.maticvigil.com/address/" + address + "/transactions";
        case constants_1.ChainId.Theta:
            return "https://explorer.thetatoken.org/address/" + address;
        case constants_1.ChainId.ThetaTestnet:
            return "https://testnet-explorer.thetatoken.org/address/" + address;
        case constants_1.ChainId.Harmony:
            return "https://explorer.harmony.one/address/" + address;
        case constants_1.ChainId.Moonriver:
            return "https://blockscout.moonriver.moonbeam.network/address/" + address + "/transactions";
        case constants_1.ChainId.Palm:
            return "https://explorer.palm.io/address/" + address;
        case constants_1.ChainId.Fantom:
            return "https://ftmscan.com/address/" + address;
    }
}
exports.getExplorerAddressLink = getExplorerAddressLink;
function getExplorerTransactionLink(transactionHash, chainId) {
    switch (chainId) {
        case constants_1.ChainId.Mainnet:
        case constants_1.ChainId.Ropsten:
        case constants_1.ChainId.Kovan:
        case constants_1.ChainId.Rinkeby:
        case constants_1.ChainId.Goerli:
            return "https://" + etherscanNetworkPrefix(chainId) + "etherscan.io/tx/" + transactionHash;
        case constants_1.ChainId.BSC:
            return "https://bscscan.com/tx/" + transactionHash;
        case constants_1.ChainId.BSCTestnet:
            return "https://testnet.bscscan.com/tx/" + transactionHash;
        case constants_1.ChainId.xDai:
            return "https://blockscout.com/poa/xdai/tx/" + transactionHash + "/internal-transactions";
        case constants_1.ChainId.Polygon:
            return "https://explorer-mainnet.maticvigil.com/tx/" + transactionHash + "/internal-transactions";
        case constants_1.ChainId.Mumbai:
            return "https://explorer-mumbai.maticvigil.com/tx/" + transactionHash + "/internal-transactions";
        case constants_1.ChainId.Theta:
            return "https://explorer.thetatoken.org/tx/" + transactionHash;
        case constants_1.ChainId.ThetaTestnet:
            return "https://testnet-explorer.thetatoken.org/tx/" + transactionHash;
        case constants_1.ChainId.Harmony:
            return "https://explorer.harmony.one/tx/" + transactionHash;
        case constants_1.ChainId.Moonriver:
            return "https://blockscout.moonriver.moonbeam.network/tx/" + transactionHash + "/internal-transactions";
        case constants_1.ChainId.Palm:
            return "https://explorer.palm.io/tx/" + transactionHash;
        case constants_1.ChainId.Fantom:
            return "https://ftmscan.com/tx/" + transactionHash;
    }
}
exports.getExplorerTransactionLink = getExplorerTransactionLink;
function getChainName(chainId) {
    return constants_1.CHAIN_NAMES[chainId];
}
exports.getChainName = getChainName;
function isTestChain(chainId) {
    return constants_1.TEST_CHAINS.includes(chainId);
}
exports.isTestChain = isTestChain;
function isLocalChain(chainId) {
    return constants_1.LOCAL_CHAINS.includes(chainId);
}
exports.isLocalChain = isLocalChain;
//# sourceMappingURL=chain.js.map