import { MultiCallABI } from '../constants';
import { useMulticallAddress } from './useMulticallAddress';
import { useContractCall } from './useContractCall';
export function useEtherBalance(address) {
    var _a;
    const multicallAddress = useMulticallAddress();
    const [etherBalance] = (_a = useContractCall(multicallAddress &&
        address && {
        abi: MultiCallABI,
        address: multicallAddress,
        method: 'getEthBalance',
        args: [address],
    })) !== null && _a !== void 0 ? _a : [];
    return etherBalance;
}
//# sourceMappingURL=useEtherBalance.js.map