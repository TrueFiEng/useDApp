import { ChainId } from '../../constants';
import { StoredTransaction, StoredTransactions } from './model';
declare type Action = AddTransaction | UpdateTransactions;
interface AddTransaction {
    type: 'ADD_TRANSACTION';
    payload: StoredTransaction;
}
interface UpdateTransactions {
    type: 'UPDATE_TRANSACTIONS';
    chainId: ChainId;
    transactions: StoredTransaction[];
}
export declare function transactionReducer(state: StoredTransactions, action: Action): StoredTransactions;
export {};
//# sourceMappingURL=reducer.d.ts.map