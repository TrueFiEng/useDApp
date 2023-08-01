# WalletConnectV2Connector for useDApp

Connector for [WalletConnectV2](https://docs.walletconnect.com/) for useDApp.

## Example usage

Update your `usedapp` config:

```ts
connectors: {
    ...
    walletConnectV2: new WalletConnectV2Connector({
      projectId: <YOUR_WALLETCONNECT_PROJECT_ID>,
      chains: [Mainnet],
      rpcMap: {
        1: 'https://mainnet.infura.io/v3/<YOUR_INFURA_KEY>',
      },
    }),
    ...
  },
```

Now you can use the connector:

```tsx
import { useEthers } from '@usedapp/core'

...

const { activateBrowserWallet } = useEthers();

...

<button onClick={() => activateBrowserWallet({ type: 'walletConnectV2' })}>Connect</button>
```
