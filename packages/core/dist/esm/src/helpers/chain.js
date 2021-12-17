import { DEFAULT_SUPPORTED_CHAINS } from '../constants';
export const getChainById = (chainId) => DEFAULT_SUPPORTED_CHAINS.find((network) => network.chainId === chainId);
const deprecationWarning = (methodName) => console.warn(`${methodName} is deprecated, can call with Chain directly`);
export const getExplorerAddressLink = (address, chainId) => {
    var _a;
    deprecationWarning('getExplorerAddressLink');
    return ((_a = getChainById(chainId)) === null || _a === void 0 ? void 0 : _a.getExplorerAddressLink(address)) || '';
};
export const getExplorerTransactionLink = (transactionHash, chainId) => {
    var _a;
    deprecationWarning('getExplorerTransactionLink');
    return ((_a = getChainById(chainId)) === null || _a === void 0 ? void 0 : _a.getExplorerTransactionLink(transactionHash)) || '';
};
export const getChainName = (chainId) => {
    var _a;
    deprecationWarning('getChainName');
    return ((_a = getChainById(chainId)) === null || _a === void 0 ? void 0 : _a.chainName) || '';
};
export const isTestChain = (chainId) => {
    var _a;
    deprecationWarning('isTestChain');
    return ((_a = getChainById(chainId)) === null || _a === void 0 ? void 0 : _a.isTestChain) || false;
};
export const isLocalChain = (chainId) => {
    var _a;
    deprecationWarning('isLocalChain');
    return ((_a = getChainById(chainId)) === null || _a === void 0 ? void 0 : _a.isLocalChain) || false;
};
//# sourceMappingURL=chain.js.map