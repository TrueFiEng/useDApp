# Exercise 1

In the first exercise we'll use the provided template to implement connecting our DApp to MetaMask. We'll be modifying two files: `packages/frontend/src/components/AccountButton.tsx` and `packages/frontend/src/components/AccountModal.tsx`. Let's start with the `AccountButton.tsx` file.

## AccountButton.tsx

This file contains the `AccountButton` component. It's a button that displays the current account address and allows the user to connect to a wallet. It also displays a modal with the account details when the user clicks on the button. Let's start by importing the `useEthers` hook from `useDApp`:

```tsx
import { useEthers } from '@usedapp/core';
```

Next we'll use the `useEthers` hook to get the current account address and the `activateBrowserWallet` function.

```ts
const { account, activateBrowserWallet } = useEthers();
```

Modify the `onConnect` function to use the `activateBrowserWallet` function:

```ts
const onConnect = async () => {
  await activateBrowserWallet();
};
```

If the user is connected, the the `account` variable we'll be set to the current user's address. We want to print the shortened address instead of the connect button when the user is connected.

```diff
- // TODO: Display this component only if the user is connected
- if (false) {
+ if (account) {
```

To print the shortened address we'll use the `shortenAddress` function from `useDApp`:

```diff
- import { useEthers } from '@usedapp/core';
+ import { shortenAddress, useEthers } from '@usedapp/core';
```

```diff
- {/* TODO: Display shortened version of connected user */}
+  {shortenAddress(account)}
```

## AccountModal.tsx

The next step will be to display the account details in the modal. We'll also add a button that allows the user to disconnect from the wallet. Let's start by making all the necessary imports:

```ts
import { shortenAddress, useEtherBalance, useEthers } from '@usedapp/core';
import { utils } from 'ethers';
```

We can get the current account address the same way as in the `AccountButton.tsx` file, but this time we'll also want to get the `deactivate` function which allows us to disconnect from the wallet.

```ts
const { account, deactivate } = useEthers();
```

Next get the current account balance. We can do that using the `useEtherBalance` hook:

```ts
const balance = useEtherBalance(account);
```

Let's display the account address and the balance in the modal:

```diff
- // TODO: The Dialog should should be displayed only if the user is connected
- if (true) {
+  if (!account) {
```

```diff
- {/* TODO: Display shortened version of connected user */}
+ {shortenAddress(account)}
```

```diff
- {/* TODO: Display balance of the current user */}
+ {balance ? utils.formatEther(balance) : 0} ETH
```

Let's now implement functionality for the disconnect button. We'll use the `deactivate` function we got from the `useEthers` hook:

```diff
- // TODO: Disconnect from wallet
+ deactivate();
```

The last thing to do in this exercise is to allow the user to copy the account address by pressing the copy button.

```diff
- // TODO: Copy address of the current user to clipboard
+ if (account) {
+   navigator.clipboard.writeText(account);
+ }
```

This concludes the first exercise. You should now be able to connect your DApp to MetaMask.
