Core API
########

Providers
*********

<DAppProvider>
==============

Provides basic services for a DApp. It combines the following components: ``<ConfigProvider>``, ``<EthersProvider>``, ``<BlockNumberProvider>``, ``<ChainStateProvider>`` and ``<ReadOnlyProviderActivator>``


*Properties:*

- ``config: Partial<Config>``: configuration of the Dapp, see `Config`_

*Example:*

.. code-block:: jsx

  const config = {
    readOnlyChainId: ChainId.Mainnet,
    readOnlyUrls: {
      [ChainId.Mainnet]: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    },
  }
  
  return (
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  )



<ConfigProvider>
================

Stores configurations and makes them available via `useConfig`_ hook.


<EthersProvider>
================

*Requires:* ``ConfigProvider``


<BlockNumberProvider>
=====================


<ChainStateProvider>
====================


<ReadOnlyProviderActivator>
===========================


Hooks
*****

useBlock
========

useBlockMeta
============

useChainCalls
=============

*Parameters*

- ``calls: ChainCall[]``


useConfig
=========



useDebounce
===========

**Generic parameters**

- ``T`` 

**Parameters**

- delay: number

**Returns**

- ``T`` 

useDebouncePair
===============

**Generic parameters**

- ``T`` 
- ``U`` 

**Parameters**

- ``first: T``
- ``second: U``
- ``delay: number``

**Returns**

- ``[T, U]`` 

useEthers
=========

Returns connection state and functions that allow to manipulate the state.

**Returns:**

    - ``account: null | string`` - current user account (or *null* if not connected or connected in read-only mode)
    - ``chainId: ChainId`` - current chainId (or *undefined* if not connected)
    - ``library: Web3Provider`` - an instance of ethers `Web3Provider <https://github.com/EthWorks/useDapp/tree/master/packages/example>`_ (or *undefined* if not connected)
    - ``active: boolean`` - returns if is connected (read or write mode)
    - ``activateBrowserWallet()`` - function that will inititate connection to browser web3 extension (e.g. Metamask)
    - ``async activate(connector: AbstractConnector, onError?: (error: Error) => void, throwErrors?: boolean)``
    - ``async deactivate()`` - 
    - ``error?: Error`` - error that occured during connecting (e.g. connection broken, unsupported network)


*Requires:* ``<ConfigProvider>``

useMulticallAddress
===================

Models
******

Config
======

**readOnlyChainId**

``ChainId`` of a chain to connect to by deafult in a read-only mode

**readOnlyUrls**

Mapping of ``ChainId``'s to node urls to use when in read-only mode.

*Example*

.. code-block:: javascript

  {
    ...
    readOnlyUrls: {
      [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934'
    }
  }


**multicallAddresses**

**supportedChains**
List of intended supported chains. If use tries to connect 

*Default value:*
  ``[ChainId.Mainnet, ChainId.Gorli, ChainId.Kovan, ChainId.Rinkeby, ChainId.Ropsten, ChainId.xDai]``

**pollingInterval**
Polling interval for new block.

Currency
========

Constants
*********

**ChainId**
