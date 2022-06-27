---
'@usedapp/core': minor
---

The 1.1.0 release of `@usedapp/core` was focused on improving the quality and stability of the framework. The efforts were focused a lot on existing issues in the repository, regarding bugs and most-wanted feature requests.

## Improvements

- More known chains have been added, such as zkSync or boba
- Automatically deploy multicall2 on local chain (previously only multicall1)
- add SIWE
- (works with Metamask) prompt the user to add a chain to MetaMask if it's not there https://github.com/TrueFiEng/useDApp/pull/730
- New hooks: useRawLogs, useLogs, useResolveName (complement to useLookupAdderess)
- Add possibility to add a buffer to estimated gas costs when sending transactions
- useSendTransaction returns a transaction receipt
- include errorCode (previously only error message) when a sent transaction fails https://github.com/TrueFiEng/useDApp/pull/817
- Introduced a speed up of multicall encoding https://github.com/TrueFiEng/useDApp/pull/775

### Improvements related to limiting RPC calls

- Static calls https://github.com/TrueFiEng/useDApp/pull/706
- Limit refreshing when the window is not active https://github.com/TrueFiEng/useDApp/pull/786
- Ability to refresh every N blocks (or never after initial queries) https://github.com/TrueFiEng/useDApp/pull/795/files

## Bug fixes

- `useContractFunction` accepts Falsy value as a contract, to make it more uniform with how other hooks work https://github.com/TrueFiEng/useDApp/pull/695
- Support projects with `isolatedModules` enabled in their TSConfig https://github.com/TrueFiEng/useDApp/pull/762
- Properly set react and ethers as peer dependencies
- Include a workaround for https://github.com/MetaMask/metamask-extension/issues/13375 - https://github.com/TrueFiEng/useDApp/pull/792
- Do not query continously for eth_chainId if not necessary https://github.com/TrueFiEng/useDApp/pull/800
- Allow to pass different provider to `renderWeb3Hook` https://github.com/TrueFiEng/useDApp/pull/830
- Resurface error if `activateBrowserWallet` fails https://github.com/TrueFiEng/useDApp/pull/740
- (pending pr) https://github.com/TrueFiEng/useDApp/pull/849 https://github.com/TrueFiEng/useDApp/issues/742

## Documentation

## Internal testing and other operational business

- More extensive tests for multi-chain scenarios and different refreshing strategies
- Every change is immediately deployed to `dev` on NPM so that users can integrate earlier, not waiting for releases 
- Playwright tests for the example app and docs
- Introduce auto-generated documentation for all the hooks https://github.com/TrueFiEng/useDApp/pull/749
- Introduce new issue templates on github, to improve collaboration with external developers and users
- Created an example of useDapp in Next.js project