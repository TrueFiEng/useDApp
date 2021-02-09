# useDapp

Framework for creating Dapp on Ethereum with React. 
Easy. Secure. Testable. Extendable.

## Challange 

Writing Dapps comes with its own set of challenges and good practices:

- refresh UI after each new bock arrival
- work in two modes: read-only (without wallet connected) and read/write (with wallet connected)
- keep track of transactions status and inform a user when it is successfully mined or fails
- work with different wallets (Metamask, Formatic, Authereum) and networks (mainnet and testnets) and handle change nicely

With all that in mind, we want our Dapps to be easy to test and extend, build with high-pace development and security in mind.

## Solution

**useDapp** utilises best **React**, **Ethereum** and **testing** practices:
- use react hooks to communicate with the blockchain
- components automatically refresh on a new block
- multiple contract calls to are combined into a single multi-call
- extend with custom hooks
- write integration tests for components and blockchain with ease

## Example

```ts
function showBalance() {
  const {account} = useEthers();
  const balance = useTokenBalance(account.address);
  return (<EthersProvider>
    Your balance is: `${balance.format()}`
    <EthersProvider/>)
}
```

## Documentation
### Getting started
### Configure application
### Using hooks
### Custom hooks
### Testing


