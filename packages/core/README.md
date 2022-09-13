# useDapp

[![CI](https://github.com/TrueFiEng/useDApp/actions/workflows/CI.yml/badge.svg)](https://github.com/TrueFiEng/useDApp/actions/workflows/CI.yml)
[![Npm package version](https://badgen.net/npm/v/@usedapp/core)](https://npmjs.com/package/@usedapp/core)
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label)](https://discord.gg/ppFxC3E44X)

### Ethereum 🤝 React 
Framework for rapid Dapp development.  
Simple. Robust. Extendable. Testable.

## About
Introduces great features:
- 🏗️ **React hooks** - Uses React hooks as your primary building ingredient
- 🚅 **Auto refresh** - Refreshes on a new block, wallet change or network change
- 🛒 **Multicall** - Combines multiple blockchain calls into a single multicall

Combines the best practices:
- 🔧 **Modern stack** - Employs [ethers.js](https://github.com/ethers-io/), [multicall](https://github.com/makerdao/multicall) & [waffle](https://getwaffle.io/)
- 📚 **Extendability** - Extends easily with custom hooks
- 💡 **Testability** - Simple integration tests for UI and blockchain


## Example

```tsx
import { Mainnet } from '@usedapp/core/modal/chain/ethereum'
import { useEthers, useEtherBalance } from '@usedapp/core'

const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: 'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
  },
}

ReactDOM.render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>,
  document.getElementById('root')
)

const STAKING_CONTRACT = '0x00000000219ab540356cBB839Cbe05303d7705Fa'

export function App() {
  const { activateBrowserWallet, deactivate, account } = useEthers()
  const userBalance = useEtherBalance(account)
  const stakingBalance = useEtherBalance(STAKING_CONTRACT)

  return (
    <div>
      {!account && <button onClick={activateBrowserWallet}> Connect </button>}
      {account && <button onClick={deactivate}> Disconnect </button>}
      {stakingBalance && <p>ETH2 staking balance: {formatEther(stakingBalance)} ETH </p>}
      {account && <p>Account: {account}</p>}
      {userBalance && <p>Ether balance: {formatEther(userBalance)} ETH </p>}
    </div>
  )
}
```

See application [here](https://example.usedapp.io/balance).


## Documentation
For detailed feature walkthrough checkout [documentation](https://usedapp-docs.netlify.app/docs).

## Contributing

Contributions are always welcome, no matter how large or small. Before contributing, please read the [code of conduct](https://github.com/TrueFiEng/useDApp/blob/master/CODE_OF_CONDUCT.md) and [contribution policy](https://github.com/TrueFiEng/useDApp/blob/master/CONTRIBUTION.md).

### Before you issue pull request:

* Make sure all tests pass.
* Make sure linter passes.
* Make sure you have test coverage for any new features.

To install dependencies type:
```sh
npm i -g pnpm
pnpm install
```

To build project:
```sh
yarn build
```

To run tests type:
```sh
yarn test
```

To run linter type:
```sh
yarn lint
```

## License

useDapp is released under the [MIT License](https://opensource.org/licenses/MIT).
