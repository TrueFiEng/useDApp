import { JsonRpcProvider } from '@ethersproject/providers';
import { ChainId } from '../../../constants';
import { Dispatch } from 'react';
import { BlockNumberChanged } from './reducer';
export declare function subscribeToNewBlock(provider: JsonRpcProvider | undefined, chainId: ChainId | undefined, dispatch: Dispatch<BlockNumberChanged>): () => void;
//# sourceMappingURL=subscribeToNewBlock.d.ts.map