# useDapp

Framework for Ethereum Dapps on React.
Easy to learn for developer. Robust experience for user. 
Secure. Testable. Extendable.

## Problem
A Dapp is a bit different animal than a typical web application.

A Dapp designed with **user experience** in mind will:
- 🔄 refresh after a new block arrives
- 📺 work in view mode before connecting a wallet
- ✅ show the status of the current transactions 
- 🛅 and more :)

A Dapp designed with **developer experience** in mind will:
- 🧪 work on both mainnet and testnets
- 🛡️ be error proof and easy to test 
- 🍼 be easy to develop and extend
- 🧰 and much more...

These requirements used to make writing quality DApps somewhat challenging, but no more with useDapp.

## Solution

**useDapp** combines the best practices of **React**, **Ethereum** and programming in general:
- 🧱 uses react hooks as your primary building ingredient
- 🚅 refreshes components automatically on each block if needed
- 🛒 combines multiple blockchain calls into a single multicall
- 📚 extends easily with custom hooks
- 🎚️ tests integration of UI and blockchain easily

## Example

```tsx
const config: Config = {
  readOnlyChain: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
  },
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

export function App() {
  const { activate, account } = useEthers()
  return (
      <div>
        <button onClick={() => activate(injected)}>Connect</button>
      </div>
      {account && <p>Account: {account}</p>}
    </div>
  )
}
```

## Documentation
### Getting started
### Configure application
### Using hooks
### Custom hooks
### Testing
