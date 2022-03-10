import { TransactionOptions } from '../../src';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import { LogDescription } from 'ethers/lib/utils';
import { ContractFunctionNames, Params, TypedContract } from '../model/types';
export declare function connectContractToSigner(contract: Contract, options?: TransactionOptions, library?: JsonRpcProvider): Contract;
export declare function useContractFunction<T extends TypedContract, FN extends ContractFunctionNames<T>>(contract: T, functionName: FN, options?: TransactionOptions): {
    send: (...args: Params<T, FN>) => Promise<void>;
    state: import("../model/TransactionStatus").TransactionStatus;
    events: LogDescription[] | undefined;
    resetState: () => void;
};
//# sourceMappingURL=useContractFunction.d.ts.map