import { Chain } from '../../constants';
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink';

const lineaExplorerUrl = 'https://explorer.goerli.linea.build';

export const LineaTestnet: Chain = {
    chainId: 59140,
    chainName: 'Linea Testnet',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x9901f3053527a58B8C210B144f53CbeA7b6E23Fb',
    rpcUrl: 'https://rpc.goerli.linea.build',
    nativeCurrency: {
        name: 'Linea Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    blockExplorerUrl: lineaExplorerUrl,
    getExplorerAddressLink: getAddressLink(lineaExplorerUrl),
    getExplorerTransactionLink: getTransactionLink(lineaExplorerUrl),
};

export default { LineaTestnet };
