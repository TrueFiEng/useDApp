import { ChainId } from '../constants';
export declare const getChainById: (chainId: ChainId) => import("../constants").Chain | undefined;
export declare const getExplorerAddressLink: (address: string, chainId: ChainId) => string | '';
export declare const getExplorerTransactionLink: (transactionHash: string, chainId: ChainId) => string | '';
export declare const getChainName: (chainId: ChainId) => string;
export declare const isTestChain: (chainId: ChainId) => boolean;
export declare const isLocalChain: (chainId: ChainId) => boolean;
//# sourceMappingURL=chain.d.ts.map