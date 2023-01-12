# Exercise 3

In this part we'll learn how to send transactions to the blockchain using useDApp.

In the application we're building, go to the third tab. The tab has three small forms. The exercise is to wire up the UI so we're able to interact with the `WETH10` via those forms. In this exercise you'll need to modify the `Exercise3.tsx` file.

Each form is extracted to a separate component.

👉 Let's start with `DepositComponent`.

## DepositComponent

We'll use the same pattern of creating an `ethers` contract instance as in the previous exercise. First we need to add few more imports to the top of our file.

```ts title="packages/frontend/src/components/Exercise3.tsx"
import { useEthers } from '@usedapp/core';
import { WETH10ABI, WETH10 } from '@simple-dapp/contracts';
import { Contract, utils } from 'ethers';
```

And then in the `DepositComponent` component:

```ts title="packages/frontend/src/components/Exercise3.tsx"
const { chainId } = useEthers();
const weth10Address = chainId && weth10Addresses[chainId];
const weth10Contract = new Contract(weth10Address, WETH10ABI.abi) as WETH10;
```

Next we need to implement logic for sending a transaction when the user clicks the `Deposit` button. We'll use the `useContractFunction` hook. Let's import it first:

```diff
- import { useEthers } from '@usedapp/core';
+ import { useContractFunction, useEthers } from '@usedapp/core';
```

And then in the `DepositComponent` component:

```ts title="packages/frontend/src/components/Exercise3.tsx"
  const { send, state } = useContractFunction(weth10Contract, 'deposit');
```

The `useContractFunction` hook returns an object with two properties: `send` and `state`. The `send` function is used to send a transaction. The `state` object contains a variety of fields with information about the transaction, but we'll only use the `status` field in this exercise. The `status` field can have one of the following values: `None`, `PendingSignature`, `Mining`, `Success`, `Fail`, `Exception`, `CollectingSignaturePool`. The last one is used for sending transactions with  wallets.

Let's now update the `handleDeposit` function to use the `send` function:

```diff
- // TODO: deposit `value` ETH to WETH10 contract
+ send({ value: utils.parseEther(value) });
+ setValue(''); // resetting the form values
```

Note how the `deposit` function in the `WETH10` contract doesn't actually take any arguments. Instead we're passing an object of what is called `overrides` as the last parameter (the last parameter is the last one as well in this case). The `overrides` object is used to pass in additional information to the transaction. In this case we're passing in the `value` field which is the amount of ETH we want to deposit. The `value` field is a special field that is used to send ETH along with the transaction.

Let's now display the transaction status.

```diff
- value={''} // TODO: show transaction status
+ value={state.status}
```

Let's also ensure that the user doesn't send a second transaction before the first one is mined. We'll do that by disabling the `Deposit` button when the transaction is pending.

```diff
- disabled={false} // Disable button if transaction is in progress
+ disabled={state.status === 'Mining' || state.status === 'PendingSignature'}
```

## WithdrawComponent

The `WithdrawComponent` is very similar to the `DepositComponent`. The only difference is that we're calling the `withdraw` function instead of the `deposit` function. The `withdraw` function takes one argument - the amount of WETH10 we want to withdraw. We also don't need to pass in the `overrides` object this time because we're not sending any ether along the transaction (but note that your account we'll still get charged the gas fee).

In the `WithdrawComponent` component:

```diff
- // TODO: withdraw `value` WETH from WETH10 contract
+ send(utils.parseEther(value));
+ setValue('');
```

Update the rest of the TODO sections in the same way as in the `DepositComponent`.

## TransferComponent

The only difference between the `TransferComponent` and the `WithdrawComponent` is that we're calling the `transfer` function instead of the `withdraw` function. The `transfer` function takes two arguments - the address of the recipient and the amount of WETH10 we want to transfer.

In the `TransferComponent` component:

```diff
- // TODO: transfer `value` WETH to `address`
+ send(address, utils.parseEther(value));
+ setValue('');
+ setAddress('');
```

Update the rest of the TODO sections in the same way as in the `DepositComponent` and `WithdrawComponent`.

## That's it!

Congratulations! Now you're able to send transactions to the blockchain using useDApp.

You can head on to the [last page](./Summary) to summarize what we've learned.
