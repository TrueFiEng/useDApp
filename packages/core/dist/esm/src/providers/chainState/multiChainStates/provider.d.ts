import { ReactNode } from 'react';
interface Props {
    children: ReactNode;
    multicallAddresses: {
        [chainId: number]: string;
    };
}
export declare function MultiChainStateProvider({ children, multicallAddresses }: Props): JSX.Element;
export {};
//# sourceMappingURL=provider.d.ts.map