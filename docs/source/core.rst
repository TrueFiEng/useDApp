Core
====

Providers
---------

**<DAppProvider config={...} >**

Provides basic DApp services for hooks ...

Combines following components: ``<Web3ReactProvider>``, <BlockNumberProvider>``, ``<ChainStateProvider>``, ``<ReadOnlyProviderActivator>``

**<BlockNumberProvider>**

**<ChainStateProvider>**

**<ReadOnlyProviderActivator>**

Hooks
-----

**useBlock**

**useBlockMeta ()**

**useChainCalls (calls: ChainCall[])**

**useDebounce <T> (value: T, delay: number): T**

**useDebouncePair <T, U> (first: T, second: U, delay: number): [T, U]**

**useEthers ()**

**useMulticallAddress ()**

Model
-----

**Currency**

Constants
---------

**ChainId**
