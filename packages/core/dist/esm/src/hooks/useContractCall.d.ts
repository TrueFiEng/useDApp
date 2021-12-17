import { Interface } from '@ethersproject/abi';
import { Falsy } from '../model/types';
export interface ContractCall {
    abi: Interface;
    address: string;
    method: string;
    args: any[];
}
export declare function useContractCall(call: ContractCall | Falsy): any[] | undefined;
export declare function useContractCalls(calls: (ContractCall | Falsy)[]): (any[] | undefined)[];
//# sourceMappingURL=useContractCall.d.ts.map