export const Moonbeam = {
    chainId: 1284,
    chainName: 'Moonbeam',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x47152C4dCE75C77Bc9E52F5AAa2a20117971C365',
    getExplorerAddressLink: (address) => `https://blockscout.moonbeam.network/address/${address}/transactions`,
    getExplorerTransactionLink: (transactionHash) => `https://blockscout.moonbeam.network/tx/${transactionHash}/internal-transactions`,
};
export default { Moonbeam };
//# sourceMappingURL=moonbeam.js.map