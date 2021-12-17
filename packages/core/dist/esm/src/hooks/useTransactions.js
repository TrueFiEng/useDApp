import { useMemo } from 'react';
import { useTransactionsContext } from '../providers';
import { useEthers } from './useEthers';
export function useTransactions() {
    const { chainId, account } = useEthers();
    const { addTransaction, transactions } = useTransactionsContext();
    const filtered = useMemo(() => {
        var _a;
        if (chainId === undefined || !account) {
            return [];
        }
        return ((_a = transactions[chainId]) !== null && _a !== void 0 ? _a : []).filter((x) => x.transaction.from === account);
    }, [transactions, chainId, account]);
    return {
        transactions: filtered,
        addTransaction,
    };
}
//# sourceMappingURL=useTransactions.js.map