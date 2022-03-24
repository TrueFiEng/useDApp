export const xDai = {
    chainId: 100,
    chainName: 'xDai',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a',
    getExplorerAddressLink: (address) => `https://blockscout.com/poa/xdai/address/${address}/transactions`,
    getExplorerTransactionLink: (transactionHash) => `https://blockscout.com/poa/xdai/tx/${transactionHash}/internal-transactions`,
};
// xdai alias
export const Gnosis = Object.assign(Object.assign({}, xDai), { chainName: 'Gnosis' });
export default { xDai, Gnosis };
//# sourceMappingURL=xdai.js.map