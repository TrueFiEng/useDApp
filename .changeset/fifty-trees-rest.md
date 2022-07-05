---
'@usedapp/core': minor
---

The 1.1.0 release of `@usedapp/core` was focused on improving the quality and stability of the framework.

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
