import { TransactionRequest } from '@ethersproject/abstract-provider';
import { TransactionOptions } from '../../src';
export declare function useSendTransaction(options?: TransactionOptions): {
    sendTransaction: (transactionRequest: TransactionRequest) => Promise<void>;
    state: import("..").TransactionStatus;
};
//# sourceMappingURL=useSendTransaction.d.ts.map