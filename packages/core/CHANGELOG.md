# @usedapp/core

## 1.1.5

### Patch Changes

- ed915f1: ⛓ Add Optimism Göerli test chain
- f420823: Resurface error when 'switchNetwork' fails
- af0c4c4: 👮‍♀️ Disable `chainId` in `useEthers` only on unsupported or not configured chains

## 1.1.4

### Patch Changes

- d2a0e57: 🪒 Do not assign polling intervals on websocket providers

## 1.1.3

### Patch Changes

- f2c3766: ♨️ Properly update error when switching to not configured network
- 3becd1d: Remove the need for specifying ABIs dir for generating hooks

## 1.1.2

### Patch Changes

- bbb0cc9: ⛽️ Introduce `gasLimitBufferPercentage` alias

## 1.1.1

### Patch Changes

- 61963a5: Refresh only static calls with changed par

## 1.1.0

### Minor Changes

- a2f26c2: The 1.1.0 release of `@usedapp/core` was focused on improving the quality and stability of the framework.

  The efforts were focused a lot on existing issues in the repository, regarding bugs and most-wanted feature requests.

  ## Improvements

  - More known chains have been added, such as zkSync or Boba.
  - UseDapp automatically deploys Multicall2 on local chain (previously only Multicall1).
  - Sign in With Ethereum plugin has been added.
  - Prompt the user to add a chain to MetaMask if it's not there.
  - New hooks: `useRawLogs`, `useLogs`, and `useResolveName` (complement to useLookupAddress).
  - Add possibility to add a buffer to estimated gas costs when sending transactions.
  - Include errorCode (previously only error message) when a sent transaction fails.
  - Optimization - Introduced a speed up of multicall encoding.
  - Transaction hooks like `useSendTransaction` return more information to the developer, such as txHash or transaction receipt.

  ### Improvements related to limiting RPC calls

  - Static calls.
  - Limit refreshing when the window is not active.
  - Ability to refresh every N blocks (or never).
  - Do not query continuously for `eth_chainId` or `eth_blockNumber` if not necessary.

  ## Bug fixes

  - `useContractFunction` accepts Falsy value as a contract.
    - It is more uniform with how other hooks work.
  - Support projects with `isolatedModules` enabled in their TSConfig.
  - Properly set react and ethers as peer dependencies.
  - Include a workaround for [this MetaMask issue](https://github.com/MetaMask/metamask-extension/issues/13375).
  - Allow to pass different provider to `renderWeb3Hook`.
  - Resurface error if `activateBrowserWallet` fails.
  - Correctly resurface error when a call in Multicall2 fails.

  ## Documentation

  - Portion of the documentation (hooks) is now auto-generated based on JSDoc and actual code.
    - Keeping documentation close to code makes it easier to keep it up-to-date.
  - Documentation now contains live examples - snippets of code that can be interacted with.
  - Portion of the live examples is automatically tested with Playwright.

  ## Internal testing and miscellaneous

  - More extensive tests for multi-chain scenarios and different refreshing strategies.
  - Every change is immediately deployed to `dev` on NPM
    - The developers can use new features earlier.
  - Example app is automatically tested with Playwright.
  - Introduce new issue templates on github, to improve collaboration with external developers and users
  - Created an example of useDapp in a Next.js project.

### Patch Changes

- 2789dd9: 😶‍🌫️ Add gas limiter to use contract function
- 69ac77f: Added error hash returned to transaction status
- 96a3d85: Refresh static calls on props change

## 1.0.15

### Patch Changes

- 31c4833: 👨🏻‍💼 Add private key sending transactions
- 31e0475: Return error in useCall when multicall fails

## 1.0.14

### Patch Changes

- d07e0df: Fix refreshing cycle in ReadonlyNetworksProvider

## 1.0.13

### Patch Changes

- d596405: ➕ Add stricter contract type check on the useLogs hook
- 57e7582: 🔝 Update Nanoid version

## 1.0.12

### Patch Changes

- 5776ed9: Add option to config to specify different polling intervals for different chains

## 1.0.11

### Patch Changes

- 453b489: Don't poll readonly chains when unused

## 1.0.10

### Patch Changes

- d835054: ⛓ Add arbitrum reddit test chain
- 2909416: Fix refresh field in QueryOptions
- 55a28a2: 🐺 More extensive check for provider object in `renderWeb3Hook`

## 1.0.9

### Patch Changes

- 2888a3e: 🥗 Fix multiple deploying multicall during localhost connection
- c4b8ae0: Add error code to transaction status
- fcb6f41: 🦊 Add metamask filtering logic after activate browser wallet
- 5877e2d: Fix race condition between chain id and provider

## 1.0.8

### Patch Changes

- 24e9668: ⚡️ Add block refresher
- edfd60b: 😶‍🌫️ Add receipt for executing contract functions and sending transactions
- a3b1340: 🕸 Change swithNetwork to promise
- 3d815ab: Ethers as peer deps
- 4afd9b5: 🎗 Remove chainId requests

## 1.0.7

### Patch Changes

- 2a65bfb: Use more specific imports

## 1.0.6

### Patch Changes

- 6348832: ❗️ Fix exception during estimating gas price
- 1ce58ad: Add no metamask deactivate option

## 1.0.5

### Patch Changes

- bcff959: Fix ethers version
- a0ab27f: Remove testing submodule

## 1.0.4

### Patch Changes

- fe52f50: Add fast encoding options

## 1.0.3

### Patch Changes

- 4e8025b: ✖️ Add percentage margin for useTransaction
- ad8b91a: 🧻 Add useLogs hook
- 17b8021: 🐛 Fix EventRecord type issue
- d9e2ff3: Add error throwing to browser wallet activation
- 3904895: ⚗️ Support `isolatedModules`
- bd27e6b: Improved handling of Falsy parameters in hooks
- 5229eea: Update ENS hooks
- 8701d7d: 🪵 Add useRawLogs hook

## 1.0.2

### Patch Changes

- 37c3b9d: 🪱 Attempt adding network if it isn't added to wallet
- 083e9b1: Export useBlockNumbers hook as part of internal API

## 1.0.2

### Patch Changes

- 37c3b9d: 🪱 Attempt adding network if it isn't added to wallet

## 1.0.1

### Patch Changes

- 5a16232: Add astar network
- e978fd9: 🥌 Add static calls
- 3a108ad: 💤 Add zkSync to known chains
- 5067120: 🐯 Solve getting lowercase account number from metamask after changing account
- a40a680: Add Boba network

## 1.0.0

### Major Changes

- 0d2368a: 1.0.0 release

### Minor Changes

- c46b2a1: 🕸️ Add `switchNetwork` to `useEthers`

### Patch Changes

- 669c1fa: 😵‍💫 Export currencyFormattingOptions from model
- 28287db: 🔝 Update ethers to 5.6.2

## 0.12.9

### Patch Changes

- 2e4b152: Fix race condition in NetworkProvider & fix devtools integration
- 3d4cf2c: Fix metamask auto-connect behaviour
- 28afc72: Properly handle unexpected undefined address in useContractCall.

## 0.12.8

### Patch Changes

- e2d9950: Handle different cases of addresses
- 2d7b1ec: Memoize calldata encoding
- 0fd73d1: Export readonly networks provider from internal exports
- 7d4d28b: Optimize getUniqueCalls usage

## 0.12.7

### Patch Changes

- 51377cf: Remove `getAddress` calls due to performance issues

## 0.12.6

### Patch Changes

- 77bb213: Correctly memoize hook results in useContractCalls

## 0.12.5

### Patch Changes

- 42b1652: Make exports from testing and internal point to compiled code

## 0.12.4

### Patch Changes

- fcd1642: Correctly read `chainId` in read-only mode without browser wallet
- 93967af: Move parts that should be private in @usedapp/core to internal submodule
- fe1e418: Add `isLoading` to `useEthers` and refactor chainId resolution
- def0d9c: Properly merge default and supplied configs

## 0.12.3

### Patch Changes

- 30bffcc: Fix queries not working in readonly mode

## 0.12.2

### Patch Changes

- df1adcc: Add support to pass providers in the config

## 0.12.1

### Patch Changes

- 9aefc1d: Fixed pnpm lockfile.

## 0.12.0

### Minor Changes

- 378177c: Fetching state from multiple chains simultaneously
- e9907a5: Add support for wallet-connect provider

### Patch Changes

- 42e1adc: 🔧 Add typed contract calls
- ca55dd0: Explicitly export public symbols.
- d70b866: Review public API and add annotations to public symbols
- ad021b0: Use pnpm instead of yarn

## 0.11.0

### Minor Changes

- 0029496: Change Metamask connection logic when page is loaded

### Patch Changes

- 3d1ec30: Add sourcemaps to published package

## 0.10.1

### Patch Changes

- a07b14f: 📧 Add useChainMeta hook to get chain metadata from ChainId
- 9f8ce66: Add Palm Testnet support

## 0.10.0

### Minor Changes

- fd8e924: Remove @web3-react dependency, introduce own way of provider management

### Patch Changes

- c70a76e: Support EIP-1193 providers and legacy web3-react connectors

## 0.9.1

### Patch Changes

- b6fe5e1: Add the Oasis Emerald network
- 34ba891: Add missing documentation for TransactionStatus
- d04c8bb: Add the moonbeam network

## 0.9.0

### Minor Changes

- 26a4314: Add resetState function to useContractFunction and useSendTransaction so the UI can be reset easily after a transaction attempt.

### Patch Changes

- 3015cbd: Replace polygon explorer to polyscan

## 0.8.0

### Minor Changes

- 33ade3b: Add PendingSignature TransactionState for transactions that are pending signature. This gets set on each new transaction function call and clears out the previous error when new attempts are made.
- ece010c: Support Node LTS v14 and v16, abandon v10 and v12

### Patch Changes

- 1c257ce: Use isLocalChain Chain property instead of function
- e5f0951: Add multicall2 function

## 0.7.3

### Patch Changes

- 99ded36: Add Arbitrum chains

  Add Metis chain

## 0.7.2

### Patch Changes

- 9786e0d: Fixed the chainId property name in the Getting Started

  Add Optimism and Optimism Kovan network configurations

## 0.7.1

### Patch Changes

- d878308: Fix can't resolve 'lodash/merge #432

## 0.7.0

### Minor Changes

- 2f37156: Replace supportedChains with networks in config (#411)

### Patch Changes

- 45a6dc2: Remove warnings when falsy call is passed to useContractCall
- 2f37156: 🛷 Add useTokenList

## 0.6.3

### Patch Changes

- a12bfeb: Add Moonbase Alpha support (testnet for Moonbeam)

## 0.6.2

### Patch Changes

- 0365a73: 🛷 Add useTokenList

## 0.6.1

### Patch Changes

- e3b9841: Add Songbird support
- 5a93444: Enable configuring autoconnection for network provider

## 0.6.0

### Minor Changes

- 5365c19: Add Avalanche support

## 0.5.6

### Patch Changes

- b0114b5: Bump ethers version
- e7175e7: 🦞 Skip multicall if address is undefined

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
  "@ethersproject/contracts": "^5.6.0"
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
