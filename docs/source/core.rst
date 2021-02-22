Core
====

Providers
---------

**<DAppProvider config={...} >**

Provides basic DApp services for hooks ...

It combines following components: ``<ConfigProvider>``, ``<EthersProvider>``, ``<BlockNumberProvider>``, ``<ChainStateProvider>`` and ``<ReadOnlyProviderActivator>``

**<ConfigProvider>**

**<EthersProvider>**

**<BlockNumberProvider>**

**<ChainStateProvider>**

**<ReadOnlyProviderActivator>**


Configuration
-------------

**readOnlyChain**

chainId of a chain to connect in read-only mode

**readOnlyUrls**

**multicallAddresses**

**supportedChains**

**pollingInterval**
New block checking polling interval 

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
