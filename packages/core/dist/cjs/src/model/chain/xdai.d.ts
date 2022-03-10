import { Chain } from '../../constants';
export declare const xDai: Chain;
export declare const Gnosis: {
    chainName: string;
    chainId: number;
    isTestChain: boolean;
    isLocalChain: boolean;
    multicallAddress: string;
    multicall2Address?: string | undefined;
    getExplorerAddressLink: (address: string) => string;
    getExplorerTransactionLink: (address: string) => string;
};
declare const _default: {
    xDai: Chain;
    Gnosis: {
        chainName: string;
        chainId: number;
        isTestChain: boolean;
        isLocalChain: boolean;
        multicallAddress: string;
        multicall2Address?: string | undefined;
        getExplorerAddressLink: (address: string) => string;
        getExplorerTransactionLink: (address: string) => string;
    };
};
export default _default;
//# sourceMappingURL=xdai.d.ts.map