import { useBlockNumber } from '../providers/blockNumber/context';
import { useEffect, useState } from 'react';
import { useEthers } from './useEthers';
export function useGasPrice() {
    const { library } = useEthers();
    const blockNumber = useBlockNumber();
    const [gasPrice, setGasPrice] = useState();
    async function updateGasPrice() {
        setGasPrice(await (library === null || library === void 0 ? void 0 : library.getGasPrice()));
    }
    useEffect(() => {
        updateGasPrice();
    }, [library, blockNumber]);
    return gasPrice;
}
//# sourceMappingURL=useGasPrice.js.map