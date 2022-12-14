# Task 2

In this task we'll learn how to read blockchain state using useDApp.

In the application we're building, go to the second tab. This tab has a small table in which WETH balances for specific addresses should be displayed. The first row is your own address, and the address for the second row was selected arbitrarily. In this task you'll need to modify the `packages/frontend/src/components/Task2.tsx` file.

Let's start with something we already know how to do - getting the current account address. We'll use the `useEthers` hook to get the `account` variable.

```ts
const { account } = useEthers();
```

Now pass the `account` variable as props to the first row in the table:

```diff
- <TableBody>
-   <BalancesTableRow address={secondAddress}/>
-   <BalancesTableRow address={secondAddress}/>
- </TableBody>
+ <TableBody>
+   <BalancesTableRow address={account}/>
+   <BalancesTableRow address={secondAddress}/>
+ </TableBody>
```

Next let's implement the logic in `BalancesTableRow` component. We'll need the address of the `WETH` contract. But on different chains it may be different. As in this tutorial we only consider the case of two chains (Goerli and local), an object with the addresses is provided in the `packages/frontend/src/shared` directory.

```ts
import { weth10Addresses } from '../shared/weth10addresses';
```

Now create an `ethers` contract instance for the `WETH10` contract. You'll need the `WETH10ABI` object from the `@simple-dapp/contracts` package ([what's ABI?](https://docs.ethers.io/v5/api/utils/abi/)) and optionally the `WETH10` contract type - this will allow you to get type hints for the contract methods.

```ts
import { WETH10ABI, WETH10 } from '@simple-dapp/contracts';
import { Contract, utils } from 'ethers';
```

And now in the BalancesTableRow component:

```ts
const { chainId } = useEthers();
const weth10Contract = chainId && new Contract(weth10Addresses[chainId], WETH10ABI.abi) as WETH10;
```

Now we're ready to make the first call to the blockchain. We'll use the `useCall` hook.

```diff
- import { useEthers } from '@usedapp/core';
+ import { useCall, useEthers } from '@usedapp/core';
```

In the BalancesTableRow component:

```ts
const balance = useCall(address && weth10Contract && {
    contract: weth10Contract,
    method: 'balanceOf',
    args: [address],
  });
```

::: note
  The `useCall` hook accepts falsy values as well. In our case the call wouldn't make sense if `weth10Contract` or `address` were not defined, so we're using the `&&` operator to make sure that the call is made only when both values are defined.
:::

Now we can display the balance in the table.

```diff
- <TableRow>
-   <TableCell>{address}</TableCell>
-   <TableCell align="right">
-     {undefined // TODO: if request is completed
-     ?
-     false // TODO: if there is an error
-       ?
-       <Box sx={{ color: 'error.main' }}> Error fetching balance </Box>
-       :
-       '0 ETH' // TODO: show properly formatted balance balance
-     : 'Loading...'}
-   </TableCell>
- </TableRow>
+ <TableRow>
+   <TableCell>{address}</TableCell>
+   <TableCell align="right">
+     {balance
+     ?
+     balance.error 
+       ?
+       <Box sx={{ color: 'error.main' }}> Error fetching balance </Box>
+       :
+       utils.formatEther(balance.value[0])
+     : 'Loading...'}
+   </TableCell>
+ </TableRow>
```
