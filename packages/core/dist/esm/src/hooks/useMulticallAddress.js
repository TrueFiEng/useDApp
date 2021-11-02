import { useContext } from 'react';
import { ChainStateContext } from '../providers/chainState/context';
export function useMulticallAddress() {
    return useContext(ChainStateContext).multicallAddress;
}
//# sourceMappingURL=useMulticallAddress.js.map