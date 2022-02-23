import { Chain } from '../../constants'

export const AuroraTestnet: Chain = {
    chainId: 1313161555,
    chainName: 'Aurora Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x755E730F28A31079711aB588e3568e70A40F3564',
    getExplorerAddressLink: (address) => `https://explorer.testnet.aurora.dev/address/${address}`,
    getExplorerTransactionLink: (transactionHash) => `https://explorer.testnet.aurora.dev/tx/${transactionHash}`,
}

export default { 
    AuroraTestnet,
}
