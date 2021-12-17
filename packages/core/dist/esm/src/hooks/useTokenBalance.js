import { ERC20Interface } from '../constants';
import { useContractCall } from './useContractCall';
export function useTokenBalance(tokenAddress, address) {
    var _a;
    const [tokenBalance] = (_a = useContractCall(address &&
        tokenAddress && {
        abi: ERC20Interface,
        address: tokenAddress,
        method: 'balanceOf',
        args: [address],
    })) !== null && _a !== void 0 ? _a : [];
    return tokenBalance;
}
//# sourceMappingURL=useTokenBalance.js.map