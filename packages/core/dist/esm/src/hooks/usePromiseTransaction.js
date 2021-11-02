import { useCallback, useState } from 'react';
import { useTransactionsContext } from '../providers';
export function usePromiseTransaction(chainId, options) {
    const [state, setState] = useState({ status: 'None' });
    const { addTransaction } = useTransactionsContext();
    const promiseTransaction = useCallback(async (transactionPromise) => {
        var _a, _b, _c, _d, _e;
        if (!chainId)
            return;
        let transaction = undefined;
        try {
            transaction = await transactionPromise;
            setState({ transaction, status: 'Mining', chainId });
            addTransaction({
                transaction: Object.assign(Object.assign({}, transaction), { chainId: chainId }),
                submittedAt: Date.now(),
                transactionName: options === null || options === void 0 ? void 0 : options.transactionName,
            });
            const receipt = await transaction.wait();
            setState({ receipt, transaction, status: 'Success', chainId });
            return receipt;
        }
        catch (e) {
            const errorMessage = (_e = (_c = (_b = (_a = e.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : e.reason) !== null && _c !== void 0 ? _c : (_d = e.data) === null || _d === void 0 ? void 0 : _d.message) !== null && _e !== void 0 ? _e : e.message;
            if (transaction) {
                setState({ status: 'Fail', transaction, receipt: e.receipt, errorMessage, chainId });
            }
            else {
                setState({ status: 'Exception', errorMessage, chainId });
            }
            return undefined;
        }
    }, [chainId, setState, addTransaction, options]);
    return { promiseTransaction, state };
}
//# sourceMappingURL=usePromiseTransaction.js.map