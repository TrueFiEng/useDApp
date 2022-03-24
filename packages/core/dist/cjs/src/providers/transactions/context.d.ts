/// <reference types="react" />
import { StoredTransaction, StoredTransactions } from './model';
export declare const TransactionsContext: import("react").Context<{
    transactions: StoredTransactions;
    addTransaction: (payload: StoredTransaction) => void;
}>;
export declare function useTransactionsContext(): {
    transactions: StoredTransactions;
    addTransaction: (payload: StoredTransaction) => void;
};
//# sourceMappingURL=context.d.ts.map