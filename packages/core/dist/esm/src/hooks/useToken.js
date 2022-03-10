import { ERC20Interface } from '../constants';
import { useContractCalls } from './useContractCall';
export function useToken(tokenAddress) {
    var _a, _b;
    const partialCall = {
        abi: ERC20Interface,
        address: tokenAddress || '',
        args: [],
    };
    const args = ['name', 'symbol', 'decimals', 'totalSupply'].map((method) => (Object.assign(Object.assign({}, partialCall), { method })));
    const [name, symbol, decimals, totalSupply] = useContractCalls(args);
    if (!name && !symbol && !decimals && !totalSupply) {
        return undefined;
    }
    return {
        name: (_a = name === null || name === void 0 ? void 0 : name[0]) !== null && _a !== void 0 ? _a : '',
        symbol: (_b = symbol === null || symbol === void 0 ? void 0 : symbol[0]) !== null && _b !== void 0 ? _b : '',
        decimals: decimals === null || decimals === void 0 ? void 0 : decimals[0],
        totalSupply: totalSupply === null || totalSupply === void 0 ? void 0 : totalSupply[0],
    };
}
//# sourceMappingURL=useToken.js.map