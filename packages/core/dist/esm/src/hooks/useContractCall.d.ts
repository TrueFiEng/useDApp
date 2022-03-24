import { Interface } from '@ethersproject/abi';
import { Falsy } from '../model/types';
import { QueryParams } from '../constants/type/QueryParams';
export interface ContractCall {
    abi: Interface;
    address: string;
    method: string;
    args: any[];
}
export declare function useContractCall(call: ContractCall | Falsy, queryParams?: QueryParams): any[] | undefined;
export declare function useContractCalls(calls: (ContractCall | Falsy)[], queryParams?: QueryParams): (any[] | undefined)[];
//# sourceMappingURL=useContractCall.d.ts.map