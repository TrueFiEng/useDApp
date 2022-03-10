import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers';
export interface StoredTransaction {
    transaction: TransactionResponse;
    submittedAt: number;
    receipt?: TransactionReceipt;
    lastCheckedBlockNumber?: number;
    transactionName?: string;
    originalTransaction?: TransactionResponse;
}
export declare function getStoredTransactionState(transaction: StoredTransaction): "Mining" | "Success" | "Fail";
export declare type StoredTransactions = {
    [chainID: number]: StoredTransaction[];
};
export declare const DEFAULT_STORED_TRANSACTIONS: StoredTransactions;
//# sourceMappingURL=model.d.ts.map