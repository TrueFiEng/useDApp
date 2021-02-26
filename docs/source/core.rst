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
    - ``active: boolean`` - returns if provider is connected (read or write mode)
    - ``activateBrowserWallet()`` - function that will inititate connection to browser web3 extension (e.g. Metamask)
    - ``async activate(connector: AbstractConnector, onError?: (error: Error) => void, throwErrors?: boolean)`` - function that allows to connect to a wallet
    - ``async deactivate()`` - function that disconnects wallet
    - ``error?: Error`` - an error that occurred during connecting (e.g. connection is broken, unsupported network)


*Requires:* ``<ConfigProvider>``

useMulticallAddress
===================

Models
******


.. _config:

Config
======

**readOnlyChainId**

``ChainId`` of a chain you want to connect to by default in a read-only mode

**readOnlyUrls**

Mapping of ``ChainId``'s to node URLs to use in read-only mode.

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
List of intended supported chains. If a user tries to connect to an unsupported chain an error value will be returned by `useEthers`.

**Default value:**
``[ChainId.Mainnet, ChainId.Gorli, ChainId.Kovan, ChainId.Rinkeby, ChainId.Ropsten, ChainId.xDai]``

**pollingInterval**
Polling interval for a new block.

Currency
========

The ``Currency`` class is tasked with representing the individual currencies as well as handling formatting.

The base ``Currency`` class is constructed with the following parameters:
- ``name`` - name of the currency
- ``ticker`` - e.g. USD, EUR, BTC
- ``decimals`` - number of decimal places (e.g. 2 for USD, 18 for ETH)
- ``formattingOptions`` - define how the currency values are formatted

The following formatting options are supported:

- ``decimals`` - Defaults to the decimals of the currency.
- ``thousandSeparator`` - Defaults to ``','``. Used for separating thousands.
- ``decimalSeparator`` - Defaults to ``'.'``. Used for separating the integer part from the decimal part.
- ``significantDigits`` - Defaults to Infinity. Can limit the number of digits on the decimal part, such that either the total number of displayed digits is equal to this parameter or more digits are displayed, but the decimal part is missing.
- ``useFixedPrecision`` - Defaults to false. Switches from using significant digits to fixed precision digits.
- ``fixedPrecisionDigits`` - Defaults to 0. Can specify the number of digits on the decimal part.
- ``prefix`` - Defaults to ``''``. Prepended to the result.
- ``suffix`` - Defaults to ``''``. Appended to the result.

Other variants of ``Currency`` include ``FiatCurrency``, ``NativeCurrency`` and ``Token``.

``FiatCurrency`` takes the same parameters as ``Currency`` but uses fixed precision digits by default.

``NativeCurrency`` additionally takes a ``chainId`` parameter. The format function is configured with the ticker prefix and 6 significant digits by default.

``Token`` additionally takes a ``chainId`` parameter as well as an ``address`` parameter. The format function is configured with the ticker prefix and 6 significant digits by default.

CurrencyValue
=============

The ``CurrencyValue`` class represents a value tied to a currency. The methods include:

- ``static fromString(currency, value)`` - creates a new CurrencyValue from string.
- ``static zero(currency)`` - creates a new CurrencyValue equal to 0.
- ``toString()`` - returns the value of the CurrencyValue as a decimal string with no formatting.
- ``format(overrideOptions?)`` - formats the value according to the currency. The caller can override the formatting options.
- ``map(fn)`` - returns a new CurrencyValue with value transformed by the callback.
- ``add(other)`` - returns a new CurrencyValue with value being the sum of this value and other value. The argument must be a CurrencyValue with the same Currency.
- ``sub(other)`` - returns a new CurrencyValue with value being the difference of this value and other value. The argument must be a CurrencyValue with the same Currency.
- ``mul(value)`` - returns a new CurrencyValue with value multiplied by the argument.
- ``div(value)`` - returns a new CurrencyValue with value divided by the argument.
- ``mod(value)`` - returns a new CurrencyValue with value modulo the argument.
- ``equals(other)`` - performs an equality check on the currencies and the values of both objects.
- ``lt(other)`` - checks if this value is less than the other value. The argument must be a CurrencyValue with the same Currency.
- ``lte(other)`` - checks if this value is less than or equal to the other value. The argument must be a CurrencyValue with the same Currency.
- ``gt(other)`` - checks if this value is greater than the other value. The argument must be a CurrencyValue with the same Currency.
- ``gte(other)`` - checks if this value is greater than or equal to the other value. The argument must be a CurrencyValue with the same Currency.
- ``isZero()`` - returns true if the value is zero.

Constants
*********

ChainId
=======

Enum that represents chain ids.

**Values:**
``Mainnet, Gorli, Kovan, Rinkeby, Ropsten, xDai``


Helpers
*******

getExplorerAddressLink
======================

Returns URL to blockchain explorer for an address on a given chain.

**Parameters**

- ``address: string`` - account address
- ``chainId: ChainId`` - id of a chain


**Example**

.. code-block:: javascript
    
  getExplorerAddressLink('0xC7095A52C403ee3625Ce8B9ae8e2e46083b81987', ChainId.Mainnet)   
  // https://etherscan.io/address/0xC7095A52C403ee3625Ce8B9ae8e2e46083b81987

  getExplorerAddressLink('0xC7095A52C403ee3625Ce8B9ae8e2e46083b81987', ChainId.Ropsten)   
  // https://ropsten.etherscan.io/address/0xC7095A52C403ee3625Ce8B9ae8e2e46083b81987

  getExplorerAddressLink('0xC7095A52C403ee3625Ce8B9ae8e2e46083b81987', ChainId.xDai)   
  // https://blockscout.com/poa/xdai/address/0xC7095A52C403ee3625Ce8B9ae8e2e46083b81987/transactions


getExplorerTransactionLink
==========================

Returns URL to blockchain explorer for a transaction hash on a given chain.

**Parameters**

- ``transactionHash: string`` - hash of a transaction
- ``chainId: ChainId`` - id of a chain

**Example**

.. code-block:: javascript

  getExplorerTransactionLink('0xC7095A52C403ee3625Ce8B9ae8e2e46083b81987', ChainId.Mainnet)   
  // https://etherscan.io/tx/0x5d53558791c9346d644d077354420f9a93600acf54eb6a279f12b43025392c3a

  getExplorerTransactionLink('0xC7095A52C403ee3625Ce8B9ae8e2e46083b81987', ChainId.Ropsten)   
  // https://ropsten.etherscan.io/tx/0x5d53558791c9346d644d077354420f9a93600acf54eb6a279f12b43025392c3a

  getExplorerTransactionLink('0xC7095A52C403ee3625Ce8B9ae8e2e46083b81987', ChainId.xDai)   
  // https://blockscout.com/poa/xdai/tx/0x5d53558791c9346d644d077354420f9a93600acf54eb6a279f12b43025392c3a/internal-transactions

getChainName
============

Returns name of a chain for a given `chainId`.


**Parameters**

- ``chainId: ChainId`` - id of a chain

**Example**

.. code-block:: javascript

  getChainName(ChainId.Mainnet) // Mainnet
  getChainName(ChainId.Ropsten) // Ropsten
  getChainName(ChainId.xDai)    // xDai

isTestChain
===========

Returns if a given chain is a testnet.

**Parameters**

- ``chainId: ChainId`` - id of a chain

**Example**

.. code-block:: javascript

  isTestChain(ChainId.Mainnet) // true
  isTestChain(ChainId.Ropsten) // false
  isTestChain(ChainId.xDai)    // true
