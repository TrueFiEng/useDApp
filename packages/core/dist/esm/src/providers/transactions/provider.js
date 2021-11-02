import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useReducer } from 'react';
import { useEthers, useLocalStorage } from '../../hooks';
import { useBlockNumber } from '../blockNumber';
import { useNotificationsContext } from '../notifications/context';
import { TransactionsContext } from './context';
import { DEFAULT_STORED_TRANSACTIONS } from './model';
import { transactionReducer } from './reducer';
import { useConfig } from '../config';
export function TransactionProvider({ children }) {
    const { chainId, library } = useEthers();
    const blockNumber = useBlockNumber();
    const { localStorage } = useConfig();
    const [storage, setStorage] = useLocalStorage(localStorage.transactionPath);
    const [transactions, dispatch] = useReducer(transactionReducer, storage !== null && storage !== void 0 ? storage : DEFAULT_STORED_TRANSACTIONS);
    const { addNotification } = useNotificationsContext();
    useEffect(() => {
        setStorage(transactions);
    }, [transactions]);
    const addTransaction = useCallback((payload) => {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload,
        });
        addNotification({
            notification: {
                type: 'transactionStarted',
                transaction: payload.transaction,
                submittedAt: payload.submittedAt,
                transactionName: payload.transactionName,
            },
            chainId: payload.transaction.chainId,
        });
    }, [dispatch]);
    useEffect(() => {
        const updateTransactions = async () => {
            var _a;
            if (!chainId || !library || !blockNumber) {
                return;
            }
            const checkTransaction = async (tx) => {
                if (tx.receipt || !shouldCheck(blockNumber, tx)) {
                    return tx;
                }
                try {
                    const receipt = await library.getTransactionReceipt(tx.transaction.hash);
                    if (receipt) {
                        const type = receipt.status === 0 ? 'transactionFailed' : 'transactionSucceed';
                        addNotification({
                            notification: {
                                type,
                                submittedAt: Date.now(),
                                transaction: tx.transaction,
                                receipt,
                                transactionName: tx.transactionName,
                            },
                            chainId,
                        });
                        return Object.assign(Object.assign({}, tx), { receipt });
                    }
                    else {
                        return Object.assign(Object.assign({}, tx), { lastCheckedBlockNumber: blockNumber });
                    }
                }
                catch (error) {
                    console.error(`failed to check transaction hash: ${tx.transaction.hash}`, error);
                }
                return tx;
            };
            const chainTransactions = (_a = transactions[chainId]) !== null && _a !== void 0 ? _a : [];
            const newTransactions = [];
            for (const tx of chainTransactions) {
                const newTransaction = await checkTransaction(tx);
                newTransactions.push(newTransaction);
            }
            dispatch({ type: 'UPDATE_TRANSACTIONS', chainId, transactions: newTransactions });
        };
        updateTransactions();
    }, [chainId, library, blockNumber]);
    return _jsx(TransactionsContext.Provider, { value: { transactions, addTransaction }, children: children }, void 0);
}
function shouldCheck(blockNumber, tx) {
    if (tx.receipt) {
        return false;
    }
    if (!tx.lastCheckedBlockNumber) {
        return true;
    }
    const blocksSinceCheck = blockNumber - tx.lastCheckedBlockNumber;
    if (blocksSinceCheck < 1) {
        return false;
    }
    const minutesPending = (Date.now() - tx.submittedAt) / 1000 / 60;
    if (minutesPending > 60) {
        // every 10 blocks if pending for longer than an hour
        return blocksSinceCheck > 9;
    }
    if (minutesPending > 5) {
        // every 3 blocks if pending more than 5 minutes
        return blocksSinceCheck > 2;
    }
    // otherwise every block
    return true;
}
//# sourceMappingURL=provider.js.map