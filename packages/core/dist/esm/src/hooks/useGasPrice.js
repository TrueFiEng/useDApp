import { useBlockNumber } from '../providers/blockNumber/blockNumber/context';
import { useEffect, useMemo, useState } from 'react';
import { useEthers } from './useEthers';
import { useReadonlyNetworks } from '../providers/network/readonlyNetworks';
import { useBlockNumbers } from '../providers/blockNumber/blockNumbers';
export function useGasPrice(queryParams = {}) {
    const { library } = useEthers();
    const providers = useReadonlyNetworks();
    const _blockNumber = useBlockNumber();
    const blockNumbers = useBlockNumbers();
    const [gasPrice, setGasPrice] = useState();
    const { chainId } = queryParams;
    const [provider, blockNumber] = useMemo(() => (chainId ? [providers[chainId], blockNumbers[chainId]] : [library, _blockNumber]), [providers, library, blockNumbers, _blockNumber]);
    async function updateGasPrice() {
        setGasPrice(await (provider === null || provider === void 0 ? void 0 : provider.getGasPrice()));
    }
    useEffect(() => {
        updateGasPrice();
    }, [provider, blockNumber]);
    return gasPrice;
}
//# sourceMappingURL=useGasPrice.js.map