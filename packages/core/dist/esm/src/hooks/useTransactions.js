import { useMemo } from 'react';
import { useTransactionsContext } from '../providers';
import { useEthers } from './useEthers';
export function useTransactions(queryParams = {}) {
    const { chainId: defaultChainId, account } = useEthers();
    const { addTransaction, transactions } = useTransactionsContext();
    const { chainId: _chainId } = queryParams;
    const chainId = useMemo(() => _chainId !== null && _chainId !== void 0 ? _chainId : defaultChainId, [_chainId, defaultChainId]);
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