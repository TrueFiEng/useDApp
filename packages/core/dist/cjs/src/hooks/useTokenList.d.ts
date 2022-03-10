import { TokenInfo } from '@uniswap/token-lists';
interface TokenList {
    name: string;
    logoURI: string;
    tokens: TokenInfo[];
}
export declare function useTokenList(tokenListURI: string, overrideChainId?: number, tags?: string[]): TokenList | undefined;
export {};
//# sourceMappingURL=useTokenList.d.ts.map