import { useEthers } from './useEthers';
import { usePromiseTransaction } from './usePromiseTransaction';
export function useSendTransaction(options) {
    const { library, chainId } = useEthers();
    const { promiseTransaction, state } = usePromiseTransaction(chainId, options);
    const sendTransaction = async (transactionRequest) => {
        const signer = (options === null || options === void 0 ? void 0 : options.signer) || (library === null || library === void 0 ? void 0 : library.getSigner());
        if (signer) {
            await promiseTransaction(signer.sendTransaction(transactionRequest));
        }
    };
    return { sendTransaction, state };
}
//# sourceMappingURL=useSendTransaction.js.map