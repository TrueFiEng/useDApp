export const Cronos = {
    chainId: 25,
    chainName: 'Cronos',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x0fA4d452693F2f45D28c4EC4d20b236C4010dA74',
    getExplorerAddressLink: (address) => `https://cronoscan.com/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://cronoscan.com/tx/${transactionHash}`,
};
export const CronosTestnet = {
    chainId: 338,
    chainName: 'CronosTestnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x6a8c1ba309136D78245f1F0a14790239b71a9577',
    getExplorerAddressLink: (address) => `https://cronos.crypto.org/explorer/testnet3/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://cronos.crypto.org/explorer/testnet3/tx/${transactionHash}`,
};
export default {
    Cronos,
    CronosTestnet,
};
//# sourceMappingURL=cronos.js.map