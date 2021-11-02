import { AbstractConnector } from '@web3-react/abstract-connector';
import { ReactNode } from 'react';
export interface MockWeb3WrapperProps {
    connector?: AbstractConnector;
    children?: ReactNode;
}
export declare const MockWeb3Wrapper: ({ children, connector }: MockWeb3WrapperProps) => JSX.Element;
//# sourceMappingURL=mockWeb3Wrapper.d.ts.map