import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers';
import { ChainId } from '../../constants';
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
    [T in ChainId]?: StoredTransaction[];
};
export declare const DEFAULT_STORED_TRANSACTIONS: StoredTransactions;
//# sourceMappingURL=model.d.ts.map