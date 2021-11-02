import { useCallback, useState } from 'react';
import { useEthers } from './useEthers';
import { usePromiseTransaction } from './usePromiseTransaction';
export function connectContractToSigner(contract, options, library) {
    if (contract.signer) {
        return contract;
    }
    if (options === null || options === void 0 ? void 0 : options.signer) {
        return contract.connect(options.signer);
    }
    if (library === null || library === void 0 ? void 0 : library.getSigner()) {
        return contract.connect(library.getSigner());
    }
    throw new TypeError('No signer available in contract, options or library');
}
export function useContractFunction(contract, functionName, options) {
    const { library, chainId } = useEthers();
    const { promiseTransaction, state } = usePromiseTransaction(chainId, options);
    const [events, setEvents] = useState(undefined);
    const send = useCallback(async (...args) => {
        const contractWithSigner = connectContractToSigner(contract, options, library);
        const receipt = await promiseTransaction(contractWithSigner[functionName](...args));
        if (receipt === null || receipt === void 0 ? void 0 : receipt.logs) {
            const events = receipt.logs.reduce((accumulatedLogs, log) => {
                try {
                    return log.address === contract.address
                        ? [...accumulatedLogs, contract.interface.parseLog(log)]
                        : accumulatedLogs;
                }
                catch (_err) {
                    return accumulatedLogs;
                }
            }, []);
            setEvents(events);
        }
    }, [contract, functionName, options, library]);
    return { send, state, events };
}
//# sourceMappingURL=useContractFunction.js.map