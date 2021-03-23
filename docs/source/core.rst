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

useChainCall
============

Makes a call to a specific contract and returns the value. The hook will cause the component to refresh whenever a new block is mined and the value is changed.

Calls will be combined into a single multicall across all uses of *useChainCall* and *useChainCalls*.

It is recommended to use `useContractCall`_ where applicable instead of this method.

*Parameters*

- ``call: ChainCall | Falsy`` - a single call, also see `ChainCall`_. A call can be `Falsy`, as it is important to keep the same ordering of hooks even if in a given render cycle there might be not enough information to perform a call.


useChainCalls
=============

Makes multiple calls to specific contracts and returns values. The hook will cause the component to refresh when values change.

Calls will be combined into a single multicall across all uses of *useChainCall* and *useChainCalls*.
It is recommended to use `useContractCall`_ where applicable instead of this method.

*Parameters*

- ``calls: ChainCall[]`` - list of calls, also see `ChainCall`_. Calls need to be in the same order across component renders.

useContractCall
===============
Makes a call to a specific contract and returns the value. The hook will cause the component to refresh when a new block is mined and the return value changes.
A syntax sugar for `useChainCall`_ that uses ABI, function name, and arguments instead of raw data.

**Parameters**

- ``calls: ContractCall | Falsy`` - a single call to a contract , also see `ContractCall`_

**Returns**

- ``any[] | undefined`` - the result of a call or undefined if call didn't return yet

useContractCalls
===============
Makes calls to specific contracts and returns values. The hook will cause the component to refresh when a new block is mined and the return values change.
A syntax sugar for `useChainCalls`_ that uses ABI, function name, and arguments instead of raw data.

**Parameters**

- ``calls: ContractCall[]`` - a single call to a contract , also see `ContractCall`_

**Returns**

- ``any[] | undefined`` - array of results of undefined if call didn't return yet

useConfig
=========

Returns singleton instance of `Config`_.

Function takes no parameters.


useDebounce
===========

Debounce a value of type T. 
It stores a single value but returns after debounced time unless a new value is assigned before the debounce time elapses, in which case the process restarts.

**Generic parameters**

- ``T`` - type of stored value 

**Parameters**

- ``value: T`` - variable to be debounced
- ``delay: number`` - debounce time - amount of time in ms 

**Returns**

- ``T`` - debounced value

**Example**

.. code-block:: javascript

  const [someValue, setValue] = useState(...) 
  const debouncedValue = useDebounce(value, 1000)
  

useDebouncePair
===============

Debounce a pair of values of types T and U. 
It stores a single value but returns after debounced time unless a new value is assigned before the debounce time elapses, in which case the process restarts.

This function is used for debouncing multicall until enough calls are aggregated.


**Generic parameters**

- ``T`` - type of first stored value 
- ``U`` - type of second stored value  

**Parameters**

- ``first: T`` - first variable to be debounced
- ``second: U`` - second variable to be debounced
- ``delay: number`` - deboune time - amount of time in ms 

**Returns**

- ``[T, U]`` - debounced values

useEtherBalance
===============

Returns ether balance of a given account.

**Parameters**

- ``address: string | Falsy`` - address of an account

**Returns**

- ``balance: BigNumber | undefined`` - a balance of the account which is BigNumber or *undefined* if not connected to network or address is a falsy value

**Example**

.. code-block:: javascript

  const { account } = useEthers()
  const etherBalance = useEtherBalance(account)

  return (
    {etherBalance && <p>Ether balance: {formatEther(etherBalance)} ETH </p>}
  )


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



useTokenBalance
===============

Returns a balance of a given token for a given address.

**Parameters**

- ``tokenAddress: string | Falsy`` - address of a token contract
- ``address: string | Falsy`` - address of an account

**Returns**

- ``balance: BigNumber | undefined`` - a balance which is BigNumber or undefined if address or token is *Falsy* or not connected

**Example**

.. code-block:: javascript

  const DAI_ADDRESSES = '0x6b175474e89094c44da98b954eedeac495271d0f'
  const { account } = useEthers()
  const daiBalance = useTokenBalance(chainId && DAI_ADDRESSES, account)

  return (
    {daiBalance && <p>Dai balance: {formatUnits(daiBalance, 18)} DAI</p>}
  )

useTokenAllowance
===============

Returns allowance (tokens left to use by spender) for given tokenOwner - spender relationship.

**Parameters**

- ``tokenAddress: string | Falsy`` - address of a token contract
- ``ownerAddress: string | Falsy`` - address of an account to which tokens are linked
- ``spenderAddress: string | Falsy`` - address of an account allowed to spend tokens

**Returns**

- ``remainingAllowance: BigNumber | undefined`` - an allowance which is BigNumber or undefined if any address or token is *Falsy* or not connected

**Example**

.. code-block:: javascript

  const TOKEN_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f'
  const SPENDER_ADDRESS = '0xA193E42526F1FEA8C99AF609dcEabf30C1c29fAA'
  const { account, chainId } = useEthers()
  const allowance = useTokenAllowance(chainId && TOKEN_ADDRESS, account, chainId && SPENDER_ADDRESS)

  return (
    {allowance && <p>Remaining allowance: {formatUnits(allowance, 18)} tokens</p>}
  )

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

ChainCall
=========

Represents a single call on the blockchain that can be included in multicall.

Fields:

- ``address: string`` - address of a contract to call

- ``data: string`` - calldata of the call that encodes function call

ContractCall
============
Represents a single call to a contract that can be included in multicall.

Fields:

- ``abi: Interface`` - ABI of a contract, see `Interface <https://docs.ethers.io/v5/api/utils/abi/interface/>`_

- ``address: string`` - address of a contract to call

- ``method: string`` - function name

- ``args: any[]`` - arguments for the function
  

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

shortenAddress
==============

Returns short representation of address or throws an error if address is incorrent.

**Parameters**

- ``address: string`` - address to shorten

**Example**

.. code-block:: javascript

  shortenAddress('0x6E9e7A8Fb61b0e1Bc3cB30e6c8E335046267D3A0')
  // 0x6E9e...D3A0

  shortenAddress('6E9e7A8Fb61b0e1Bc3cB30e6c8E335046267D3A0')
  // 0x6E9e...D3A0

  shortenAddress("i'm not an addres")
  // TypeError("Invalid input, address can't be parsed")

shortenIfAddress
==============

Returns short representation of address or throws an error if address is incorrent.
Returns empty string if no address is provided.

**Parameters**

- ``address: string | 0 | null | undefined | false`` - address to shorten

**Example**

.. code-block:: javascript

  shortenIfAddress('0x6E9e7A8Fb61b0e1Bc3cB30e6c8E335046267D3A0')
  // 0x6E9e...D3A0

  shortenIfAddress('')
  // ''

  shortenIfAddress(undefined)
  // ''

  shortenIfAddress("i'm not an addres")
  // TypeError("Invalid input, address can't be parsed")

compareAddress
==============

Returns 1 if first address is bigger than second address. 
Returns 0 if both addresses are equal.
Returns -1 if first address is smaller than second address.
If any address can't be parsed throws an error.

**Parameters**

- ``firstAddress`` - first address to compare
- ``secondAddress`` - second address to compare

**Example**

.. code-block:: javascript

  address1 = '0x24d53843ce280bbae7d47635039a94b471547fd5'
  address2 = '0x24d53843ce280bbae7d47635039a94b471000000'
  compareAddress(address1, address2)
  // 1

  address1 = '0x000000440ad484f55997750cfae3e13ca1751283'
  address2 = '0xe24212440ad484f55997750cfae3e13ca1751283'
  compareAddress(address1, address2)
  // -1

  address1 = 'im not an address'
  address2 = '0xb293c3b2b4596824c57ad642ea2da4e146cca4cf'
  compareAddress(address1, address2)
  // TypeError("Invalid input, address can't be parsed")

addressEqual
==============

Returns true if both addresses are them same.
Returns false if addresses are different.
Throws an error if address can't be parsed.

**Parameters**

- ``firstAddress`` - first address to compare
- ``secondAddress`` - second address to compare

**Example**

.. code-block:: javascript

  address1 = '0x24d53843ce280bbae7d47635039a94b471547fd5'
  address2 = '0x24d53843ce280bbae7d47635039a94b471547fd5'
  addressEqual(address1, address2)
  // true

  address1 = '0x24d53843ce280bbae7d47635039a94b471547fd5'
  address2 = '0xe24212440ad484f55997750cfae3e13ca1751283'
  addressEqual(address1, address2)
  // false

  address1 = 'im not an address'
  address2 = '0xb293c3b2b4596824c57ad642ea2da4e146cca4cf'
  compareAddress(address1, address2)
  // TypeError("Invalid input, address can't be parsed")


