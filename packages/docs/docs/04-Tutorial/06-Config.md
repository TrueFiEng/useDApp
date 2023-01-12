# Configuring useDApp

In a moment we will implement a fully-functioning useDApp-powered dApp.
We will go through the steps to connect to a blockchain, read its state and interact with it.

Before we start implementing actual features, we have to configure `useDApp` environment.

👉 Let's import stuff that we'll need:

```ts title="packages/frontend/src/index.tsx"
import { Config, DAppProvider, Goerli, Localhost } from '@usedapp/core';
import { getDefaultProvider } from 'ethers';
```

Then create a `useDApp` config object:

```ts title="packages/frontend/src/index.tsx"
const config: Config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: getDefaultProvider('goerli'),
    [Localhost.chainId]: 'http://localhost:8545',
  },
  multicallVersion: 2
}
```

1. `readOnlyChainId` - the default chainId. We'll use Goerli test network as our default chain.
2. `readOnlyUrls` - RPC endpoints or provides for all chains we want to use. We'll use Goerli test network and our local blockchain node. Note that we can use `getDefaultProvider` from `ethers` to get a free provider for some chains. In case of local blockchain node we just pass in the URL - we setup a node on `http://localhost:8545` in previous steps.
3. `multicallVersion` - the version of the [Multicall](../02-Guides/02-Reading/05-Multicall.md) contract to use. We'll use version 2 because it provides a better error handling experience for the developer.

Please refer to the [API reference](../03-API%20Reference/03-Models.mdx#config) for more details on the `Config` object.

Next we'll wrap our app in the `DAppProvider` component and pass in the config object. To do that replace `<App />` component with this code:

```tsx title="packages/frontend/src/index.tsx"
<DAppProvider config={config}>
  <App />
</DAppProvider>
```

Now we're ready to [start implementing](./Exercise1) actual features in our DApp!
