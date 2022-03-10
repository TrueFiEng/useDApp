/// <reference types="node" />
import { EventEmitter } from 'events';
import { Network } from '../providers';
export declare function subscribeToProviderEvents(provider: EventEmitter | undefined, onUpdate: (updatedNetwork: Partial<Network>) => void, onDisconnect: (error: Error) => void): () => void;
//# sourceMappingURL=eip1193.d.ts.map