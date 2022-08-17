# @usedapp/example

## 0.5.3

### Patch Changes

- 28287db: 🔝 Update ethers to 5.6.2
- Updated dependencies [c46b2a1]
- Updated dependencies [669c1fa]
- Updated dependencies [0d2368a]
- Updated dependencies [2529256]
- Updated dependencies [28287db]
  - @usedapp/core@1.0.0
  - @usedapp/coingecko@1.0.0

## 0.5.2

### Patch Changes

- Updated dependencies [2e4b152]
- Updated dependencies [3d4cf2c]
- Updated dependencies [28afc72]
  - @usedapp/core@0.12.9
  - @usedapp/coingecko@0.5.1

## 0.5.1

### Patch Changes

- Updated dependencies [73a9bec]
- Updated dependencies [e2d9950]
- Updated dependencies [2d7b1ec]
- Updated dependencies [0fd73d1]
- Updated dependencies [7d4d28b]
  - @usedapp/coingecko@0.5.0
  - @usedapp/core@0.12.8

## 0.5.0

### Minor Changes

- 378177c: Fetching state from multiple chains simultaneously

### Patch Changes

- 42e1adc: 🔧 Add typed contract calls
- e9907a5: Add support for wallet-connect provider
- ad021b0: Use pnpm instead of yarn
- Updated dependencies [378177c]
- Updated dependencies [42e1adc]
- Updated dependencies [ca55dd0]
- Updated dependencies [d70b866]
- Updated dependencies [e9907a5]
- Updated dependencies [ad021b0]
  - @usedapp/core@0.12.0
  - @usedapp/coingecko@0.4.4

## 0.4.1

### Patch Changes

- Updated dependencies [3d1ec30]
- Updated dependencies [0029496]
  - @usedapp/core@0.11.0
  - @usedapp/coingecko@0.4.3

## 0.4.0

### Minor Changes

- fd8e924: Remove @web3-react dependency, introduce own way of provider management

### Patch Changes

- c70a76e: Support EIP-1193 providers and legacy web3-react connectors
- be413b4: Fix peer dependency conflict:
  - update @pmmmwh/react-refresh-webpack-plugin
- Updated dependencies [c70a76e]
- Updated dependencies [fd8e924]
  - @usedapp/core@0.10.0
  - @usedapp/coingecko@0.4.2

## 0.3.1

### Patch Changes

- Updated dependencies [26a4314]
- Updated dependencies [3015cbd]
  - @usedapp/core@0.9.0
  - @usedapp/coingecko@0.4.1

## 0.3.0

### Minor Changes

- ece010c: Support Node LTS v14 and v16, abandon v10 and v12

### Patch Changes

- Updated dependencies [33ade3b]
- Updated dependencies [1c257ce]
- Updated dependencies [ece010c]
- Updated dependencies [e5f0951]
  - @usedapp/core@0.8.0
  - @usedapp/coingecko@0.4.0

## 0.2.11

### Patch Changes

- 2f37156: 🛷 Add useTokenList
- Updated dependencies [45a6dc2]
- Updated dependencies [2f37156]
- Updated dependencies [2f37156]
  - @usedapp/core@0.7.0
  - @usedapp/coingecko@0.3.26

## 0.2.10

### Patch Changes

- 0365a73: 🛷 Add useTokenList
- Updated dependencies [0365a73]
  - @usedapp/core@0.6.2

## 0.2.9

### Patch Changes

- Updated dependencies [5365c19]
  - @usedapp/core@0.6.0
  - @usedapp/coingecko@0.3.25

## 0.2.8

### Patch Changes

- Updated dependencies [f5a5c47]
  - @usedapp/core@0.5.0
  - @usedapp/coingecko@0.3.24

## 0.2.7

### Patch Changes

- 9e4e4f5: Add useLookupAddress hook for ENS
- 88c5983: Refactor coingecko
- Updated dependencies [b9304cb]
- Updated dependencies [9ab6e2f]
- Updated dependencies [9e4e4f5]
- Updated dependencies [0011fe5]
- Updated dependencies [88c5983]
  - @usedapp/core@0.4.0
  - @usedapp/coingecko@0.3.22

## 0.2.6

### Patch Changes

- a98363d: Change transaction history to modal
- a087bdf: Add wallet activation error handling
- d01e07f: Change notifications to popups
- 3536be0: Add useSendTransaction to example
- Updated dependencies [b369774]
- Updated dependencies [a087bdf]
- Updated dependencies [2757d13]
  - @usedapp/core@0.3.20

## 0.2.5

### Patch Changes

- 9d4fcca: Add getStoredTransactionState and update example
- Updated dependencies [9d4fcca]
- Updated dependencies [75b6ea8]
  - @usedapp/core@0.3.19

## 0.2.4

### Patch Changes

- 8b28eae: Refactor send transaction example
- 111acee: Set TransactionStatus as interface and move it to model
- Updated dependencies [42efd99]
- Updated dependencies [21f59f6]
- Updated dependencies [111acee]
  - @usedapp/core@0.3.18

## 0.2.3

### Patch Changes

- 8018cd5: Remove git version from webpack config
- Updated dependencies [f8fe874]
  - @usedapp/core@0.3.16

## 0.2.2

### Patch Changes

- 52bf73d: 💰 Add wallet connected notification
- Updated dependencies [52bf73d]
  - @usedapp/core@0.3.12

## 0.2.1

### Patch Changes

- 99ffafd: Update yarn.lock and add missing dependencies
- Updated dependencies [99ffafd]
  - @usedapp/core@0.3.2

## 0.2.0

### Minor Changes

- 7a74be4: New features:
  ✈️ Add hook for sending transactions to blockchain
  📬 Add useNotifications and useTransactions hooks
  🥧 Add shortenTransactionHash helper

  Docs:
  🎤 Create transactions and notifications example
  📄 Add activate method in getting-started guide
  🚤 Update config example

  Breaking changes:
  🧷 Reorder token hooks arguments

  Fixes:
  💪 Move ethereum-waffle to devDependencies

### Patch Changes

- Updated dependencies [67b2dda]
- Updated dependencies [7a74be4]
  - @usedapp/core@0.3.0

## 0.1.1

### Patch Changes

- 8b8fb81: 🧹 General clean-up

  - Introduce EthersProvider and activateBrowserWallet
  - Introduce Config, ConfigProvider and useConfig
  - Fix Goerli name
  - Add missing MULTICALL_ADDRESSES
  - Update docs structure and README

- 9506ad8: Add ability to specify a background chain that will be used before wallet is connected.
- Updated dependencies [8b8fb81]
- Updated dependencies [9506ad8]
  - @usedapp/core@0.1.4
