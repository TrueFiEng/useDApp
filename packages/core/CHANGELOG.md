# @usedapp/core

## 0.5.5

### Patch Changes

- bf3b543: Handle dropped and replaced transactions

## 0.5.4

### Patch Changes

- daa3b7e: Added BSC Testnet chain ID and addresses along with currencies

## 0.5.3

### Patch Changes

- eee8bc5: Skipping unparsable logs for useContractFunction
- 5042868: Fantom support added

## 0.5.2

### Patch Changes

- cf8e28d: Add support for Theta

## 0.5.1

### Patch Changes

- aa95ff4: Add Palm support

## 0.5.0

### Minor Changes

- f5a5c47: Added local storage path to config

## 0.4.8

### Patch Changes

- a94fae5: Add missing lodash-merge dependency

## 0.4.7

### Patch Changes

- 344d795: Add Moonriver support

## 0.4.6

### Patch Changes

- 0a98795: Update ERC20 ABI
- afe26a5: Prevent crash when parsing transaction logs from contract call
- 0a82f09: Improve errorMessage from a contract call

## 0.4.5

### Patch Changes

- d9f4868: Use currently connected network as chainId for transactions

## 0.4.4

### Patch Changes

- 4c68ebb: Introduce contract events

## 0.4.3

### Patch Changes

- dc49e68: Catch lookupAddress errors for unsupported chains, e.g. Matic
- c4f2abb: use rpc errors if available

## 0.4.2

### Patch Changes

- 684dbaf: Memoize hook return values to prevent unnecessary re-renders
- 366e705: Use error messages from RPC client if available
- 779efc9: upgrade to ethers.js to 5.4.1
- 59592f3: Add Harmony support

## 0.4.1

### Patch Changes

- 810e536: fix(devtools): Adding a check for window object

## 0.4.0

### Minor Changes

- 9ab6e2f: Add devtools extension integration

### Patch Changes

- b9304cb: Remove useCallback from ChainStateProvider
- 9e4e4f5: Add useLookupAddress hook for ENS
- 0011fe5: Add support for Multicall (via Localhost multicall contract deploy)

## 0.3.24

### Patch Changes

- 0f0ebfe: Fixed dependency issue when installing applications dependencies

## 0.3.23

### Patch Changes

- ef90adb: Add Polygon and Mumbai support

## 0.3.22

### Patch Changes

- cdb02b9: Introduce useUpdateConfig
- 940d064: Introduce deep config update
- c180ac8: Add troubleshooting ethers type mismatch to docs

  Type mismatch when building might be an error in ethersproject version providing becouse of this
  ading resolutions to package.json should fix problem

  "resolutions": {
  "@ethersproject/abi": "5.2.0",
  "@ethersproject/contracts": "5.2.0"
  }

## 0.3.21

### Patch Changes

- 0ae62a3: Bump ethers to version 5.2.0

## 0.3.20

### Patch Changes

- b369774: Add persisting connection, rename ReadOnlyProviderActivator
- a087bdf: Add wallet activation error handling
- 2757d13: Fix useContractCall hook order

## 0.3.19

### Patch Changes

- 9d4fcca: Add getStoredTransactionState and update example
- 75b6ea8: Add useSendTransaction, refactor useContractFunction

## 0.3.18

### Patch Changes

- 42efd99: Expose useConfig as public API
- 21f59f6: Add BSC support
- 111acee: Set TransactionStatus as interface and move it to model

## 0.3.17

### Patch Changes

- 50633d0: Bump ethers to version 5.1.4
- 660d2eb: Fix out of order requests

## 0.3.16

### Patch Changes

- f8fe874: Emit esm package

## 0.3.15

### Patch Changes

- 77e7d1e: Add transaction name to transactions and notifications

## 0.3.14

### Patch Changes

- 1d02ac9: Export TransactionStatus type

## 0.3.13

### Patch Changes

- 8842e2b: Add notifications filtering

## 0.3.12

### Patch Changes

- 52bf73d: 💰 Add wallet connected notification

## 0.3.11

### Patch Changes

- 47ff3de: Use exact versions of dependencies

## 0.3.10

### Patch Changes

- 43a7aaa: 👷 Add HardHat node to list of supported networks

## 0.3.9

### Patch Changes

- 98afe03: Add id to notifications

## 0.3.8

### Patch Changes

- b5c30bd: Add timestamp to walletConnected notification

## 0.3.7

### Patch Changes

- 68ea649: Take errorMessage from message if transaction reverted

## 0.3.6

### Patch Changes

- 21a6dd4: Set ethers to version 5.0.32

## 0.3.5

### Patch Changes

- e6f46aa: Connect contract to signer only in send

## 0.3.4

### Patch Changes

- 47652a3: 💥 Fix useLocalStorage for serverSide rendering

## 0.3.3

### Patch Changes

- 3bd807f: add localhost to chainIds

## 0.3.2

### Patch Changes

- 99ffafd: Update yarn.lock and add missing dependencies

## 0.3.1

### Patch Changes

- feff916: Move ethers to dependencies

## 0.3.0

### Minor Changes

- 67b2dda: 🧷 Reorder token hooks arguments
- 7a74be4: New features:
  ✈️ Add hook for sending transactions to blockchain
  📬 Add useNotifications and useTransactions hooks
  🥧 Add shortenTransactionHash helper

  Docs:
  🎤 Create transactions & notifications example
  📄 Add activate method in getting-started guide
  🚤 Update config example

  Breaking changes:
  🧷 Reorder token hooks arguments

  Fixes:
  💪 Move ethereum-waffle to devDependencies

## 0.2.2

### Patch Changes

- 21a6209: 🚁 Add address helpers: shortenAddress, shortenIfAddress, compareAddress and addressEqual
- 8c06358: 💲 Create use token allowance hook

## 0.2.1

### Patch Changes

- 41988ec: 🥔 Fix call reducer

## 0.2.0

### Minor Changes

- ## 4ba5235: Currency

  Update the `Currency` class. It is now tasked with representing the individual currencies as well as handling formatting.

  The base `Currency` class is constructed with the following parameters:

  - `name` - name of the currency
  - `ticker` - e.g. USD, EUR, BTC
  - `decimals` - number of decimal places (e.g. 2 for USD, 18 for ETH)
  - `formattingOptions` - define how the currency values are formatted

  The following formatting options are supported:

  - `decimals` - Defaults to the decimals of the currency.
  - `thousandSeparator` - Defaults to ','. Used for separating thousands.
  - `decimalSeparator` - Defaults to '.'. Used for separating the integer part from the decimal part.
  - `significantDigits` - Defaults to Infinity. Can limit the number of digits on the decimal part, such that either the total number of displayed digits is equal to this parameter or more digits are displayed, but the decimal part is missing.
  - `useFixedPrecision` - Defaults to false. Switches from using significant digits to fixed precision digits.
  - `fixedPrecisionDigits` - Defaults to 0. Can specify the number of digits on the decimal part.
  - `prefix` - Defaults to ''. Prepended to the result.
  - `suffix` - Defaults to ''. Appended to the result.

  Other variants of `Currency` include `FiatCurrency`, `NativeCurrency` and `Token`.

  `FiatCurrency` takes the same parameters as `Currency` but uses fixed precision digits by default.

  `NativeCurrency` additionally takes a `chainId` parameter. The format function is configured with the ticker prefix and 6 significant digits by default.

  `Token` additionally takes a `chainId` parameter as well as an `address` parameter. The format function is configured with the ticker prefix and 6 significant digits by default.

  ## CurrencyValue

  Introduces the `CurrencyValue` class. This class represents a value tied to a currency. The methods include:

  - `static fromString(currency, value)` - creates a new CurrencyValue from string.
  - `static zero(currency)` - creates a new CurrencyValue equal to 0.
  - `toString()` - returns the value of the CurrencyValue as a decimal string with no formatting.
  - `format(overrideOptions?)` - formats the value according to the currency. The caller can override the formatting options.
  - `map(fn)` - returns a new CurrencyValue with value transformed by the callback.
  - `add(other)` - returns a new CurrencyValue with value being the sum of this value and other value. The argument must be a CurrencyValue with the same Currency.
  - `sub(other)` - returns a new CurrencyValue with value being the difference of this value and other value. The argument must be a CurrencyValue with the same Currency.
  - `mul(value)` - returns a new CurrencyValue with value multiplied by the argument.
  - `div(value)` - returns a new CurrencyValue with value divided by the argument.
  - `mod(value)` - returns a new CurrencyValue with value modulo the argument.
  - `equals(other)` - performs an equality check on the currencies and the values of both objects.
  - `lt(other)` - checks if this value is less than the other value. The argument must be a CurrencyValue with the same Currency.
  - `lte(other)` - checks if this value is less than or equal to the other value. The argument must be a CurrencyValue with the same Currency.
  - `gt(other)` - checks if this value is greater than the other value. The argument must be a CurrencyValue with the same Currency.
  - `gte(other)` - checks if this value is greater than or equal to the other value. The argument must be a CurrencyValue with the same Currency.
  - `isZero()` - returns true if the value is zero.

### Patch Changes

- a9768c8: Add more tests

  - Add tests for useTokenBalance

  - Add tests for multicall

  - Fix front running in renderWeb3Hook

## 0.1.7

### Patch Changes

- 88dfc4e: Added useContractCall.

## 0.1.6

### Patch Changes

- c230724: Use React as a peer dependency.
- 09ee2b8: Added useEtherBalance hook

## 0.1.5

### Patch Changes

- 5dae580: Added a missing dependency.

## 0.1.4

### Patch Changes

- 8b8fb81: 🧹 General clean-up

  - Introduce EthersProvider and activateBrowserWallet
  - Introduce Config, ConfigProvider and useConfig
  - Fix Goerli name
  - Add missing MULTICALL_ADDRESSES
  - Update docs structure and README

- 9506ad8: Add ability to specify a background chain that will be used before wallet is connected.

## 0.1.3

### Patch Changes

- 56c0156: 📢 Set publishing access to public

  (Test of publishing)

## 0.1.2

### Patch Changes

- 7405165: Add possibility to add user wrappers to renderWeb3Hook.

## 0.1.1

### Patch Changes

- 40e6722: Initial functionality - test changesets
