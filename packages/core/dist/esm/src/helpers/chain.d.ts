import { ChainId } from '../constants';
export declare function getExplorerAddressLink(address: string, chainId: ChainId): string | undefined;
export declare function getExplorerTransactionLink(transactionHash: string, chainId: ChainId): string | undefined;
export declare function getChainName(chainId: ChainId): string;
export declare function isTestChain(chainId: ChainId): boolean;
export declare function isLocalChain(chainId: ChainId): boolean;
//# sourceMappingURL=chain.d.ts.map