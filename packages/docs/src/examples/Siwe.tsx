import React from 'react'
import ReactDOM from 'react-dom'
import { Mainnet, DAppProvider, useEthers, Config, Goerli } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import { SiweProvider, useSiwe } from '@usedapp/siwe'

// Regular import crashes the app with "Buffer is not defined" error.
import WalletConnectProvider from '@walletconnect/web3-provider/dist/umd/index.min.js'
import { AccountIcon } from './components/AccountIcon'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
    [Goerli.chainId]: getDefaultProvider('goerli'),
  },
}

ReactDOM.render(
  <DAppProvider config={config}>
    <SiweProvider backendUrl={'http://localhost:5000'}>
      <App />
    </SiweProvider>
  </DAppProvider>,
  document.getElementById('root')
)

export function App() {
  const { account, activate, error, activateBrowserWallet } = useEthers()
  const { signIn, signOut, isLoggedIn, isLoading, cancelLoading, message, error: siweError } = useSiwe()

  async function onConnect() {
    try {
      const provider = new WalletConnectProvider({
        infuraId: 'd8df2cb7844e4a54ab0a782f608749dd',
      })
      await provider.enable()
      await activate(provider)
    } catch (error) {
      console.error(error)
    }
  }

  const ConnectButton = () => (
    <div>
      <button onClick={onConnect}>Connect with WalletConnect</button>
    </div>
  )

  const WalletConnectConnect = () => (
    <div>
      {account && (
        <div>
          <div className="inline">
            <AccountIcon account={account} />
            &nbsp;
            <div className="account">{account}</div>
          </div>
        </div>
      )}
      {!account && <ConnectButton />}
    </div>
  )

  const SiweComponent = () => {
    if (isLoading) {
      return (
        <>
          <button onClick={cancelLoading}>Cancel</button>
          <div>Loading...</div>
        </>
      )
    }
    return (
      <div>
        <button onClick={() => signIn()}>{!isLoggedIn ? 'Sign in' : 'Sign in again'}</button>
        &nbsp;
        <button disabled={!isLoggedIn} onClick={signOut}>
          Sign out
        </button>
        {siweError && <div>Error: {siweError.message}</div>}
        {isLoggedIn && (
          <>
            <p>Logged in with {message.address}</p>
            <p>Nonce: {message.nonce}</p>
            <p>ChainId: {message.chainId}</p>
          </>
        )}
        {!siweError && !isLoggedIn && <p>Not logged in</p>}
      </div>
    )
  }

  return (
    <div>
      {error && <p>{error.message}</p>}
      {!error && <WalletConnectConnect />}
      <br />
      {!account && <button onClick={() => activateBrowserWallet()}>Connect with Metamask</button>}
      {!error && account && <SiweComponent />}
    </div>
  )
}
