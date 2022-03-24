import { Contract } from 'ethers';
import { ContractMethodNames, Falsy, Params, TypedContract } from '../model/types';
import { CallResult } from '../helpers';
import { QueryParams } from '../constants/type/QueryParams';
export interface Call<T extends TypedContract = Contract, MN extends ContractMethodNames<T> = ContractMethodNames<T>> {
    contract: T;
    method: MN;
    args: Params<T, MN>;
}
export declare function useCall<T extends TypedContract, MN extends ContractMethodNames<T>>(call: Call<T, MN> | Falsy): CallResult<T, MN>;
export declare function useCalls(calls: (Call | Falsy)[], queryParams?: QueryParams): CallResult<Contract, string>[];
//# sourceMappingURL=useCall.d.ts.map