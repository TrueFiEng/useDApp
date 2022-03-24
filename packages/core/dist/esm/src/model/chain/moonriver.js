export const Moonriver = {
    chainId: 1285,
    chainName: 'Moonriver',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xa9177F8d98DAaB74C24715Ba0A81b73654710523',
    getExplorerAddressLink: (address) => `https://blockscout.moonriver.moonbeam.network/address/${address}/transactions`,
    getExplorerTransactionLink: (transactionHash) => `https://blockscout.moonriver.moonbeam.network/tx/${transactionHash}/internal-transactions`,
};
export const MoonbaseAlpha = {
    chainId: 1287,
    chainName: 'Moonbase Alpha',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x4E2cfca20580747AdBA58cd677A998f8B261Fc21',
    getExplorerAddressLink: (address) => `https://moonbase.moonscan.io/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://moonbase.moonscan.io/tx/${transactionHash}`,
};
export default { Moonriver };
//# sourceMappingURL=moonriver.js.map