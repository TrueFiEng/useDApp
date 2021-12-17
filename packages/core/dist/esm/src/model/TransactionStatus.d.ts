import { ChainId } from '../constants';
import { TransactionResponse, TransactionReceipt } from '@ethersproject/abstract-provider';
export declare type TransactionState = 'None' | 'Mining' | 'Success' | 'Fail' | 'Exception';
export interface TransactionStatus {
    status: TransactionState;
    transaction?: TransactionResponse;
    receipt?: TransactionReceipt;
    chainId?: ChainId;
    errorMessage?: string;
    originalTransaction?: TransactionResponse;
}
export declare function transactionErrored(transaction: TransactionStatus): boolean;
//# sourceMappingURL=TransactionStatus.d.ts.map