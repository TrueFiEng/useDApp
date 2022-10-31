# Configuring useDApp

Before we start implementing actual features, we have to configure `useDApp` environment. We'll do it in the `packages/frontend/src/index.tsx` file. Let's import stuff that we'll need:

```ts
import { Config, DAppProvider, Goerli, Localhost } from '@usedapp/core';
import { getDefaultProvider } from 'ethers';
```

Then create a `useDApp` config object:

```ts
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
2. `readOnlyUrls` - RPC endopints or provides for all chains we want to use. We'll use Goerli test network and our local blockchain node. Note that we can use `getDefaultProvider` from `ethers` to get a free provider for some chains. In case of local blockchain node we just pass in the URL - we setup a node on `http://localhost:8545` in previous steps.
3. `multicallVersion` - the version of the `Mutlicall` contract to use. We'll use version 2 because it provides a better error handling experience for the devloper.

Please refer to the [API reference](../03-API%20Reference/03-Models.mdx#config) for more details on the `Config` object.

Next we'll wrap our app in the `DAppProvider` component and pass in the config object. To do that replace `<App />` component with this code:

```tsx
<DAppProvider config={config}>
  <App />
</DAppProvider>
```

Now we're ready to start implementing actual features in our DApp!
