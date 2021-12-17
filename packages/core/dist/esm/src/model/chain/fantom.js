export const Fantom = {
    chainId: 250,
    chainName: 'Fantom',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xdc85396592f0F466224390771C861EE3957a3ff4',
    getExplorerAddressLink: (address) => `https://ftmscan.com/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://ftmscan.com/tx/${transactionHash}`,
};
export default { Fantom };
//# sourceMappingURL=fantom.js.map