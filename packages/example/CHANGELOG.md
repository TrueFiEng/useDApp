# @usedapp/example

## 0.2.4

### Patch Changes

- 8b28eae: Refactor send transaction example
- Updated dependencies [42efd99]
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
