import { TokenInfo } from '@uniswap/token-lists';
import { ChainId } from '../constants';
interface TokenList {
    name: string;
    logoURI: string;
    tokens: TokenInfo[];
}
export declare function useTokenList(tokenListURI: string, overrideChainId?: ChainId, tags?: string[]): TokenList | undefined;
export {};
//# sourceMappingURL=useTokenList.d.ts.map