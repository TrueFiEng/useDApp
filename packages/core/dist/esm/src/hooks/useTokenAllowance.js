import { ERC20Interface } from '../constants';
import { useContractCall } from './useContractCall';
export function useTokenAllowance(tokenAddress, ownerAddress, spenderAddress) {
    var _a;
    const [allowance] = (_a = useContractCall(ownerAddress &&
        spenderAddress &&
        tokenAddress && {
        abi: ERC20Interface,
        address: tokenAddress,
        method: 'allowance',
        args: [ownerAddress, spenderAddress],
    })) !== null && _a !== void 0 ? _a : [];
    return allowance;
}
//# sourceMappingURL=useTokenAllowance.js.map