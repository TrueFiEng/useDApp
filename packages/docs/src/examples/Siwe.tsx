import React from 'react'
import ReactDOM from 'react-dom'
import { Mainnet, DAppProvider, useEthers, Config, Rinkeby } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import { SiweProvider, useSiwe } from '@usedapp/siwe'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { AccountIcon } from './components/AccountIcon'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
    [Rinkeby.chainId]: getDefaultProvider('rinkeby'),
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
  const { signIn, signOut, isLoggedIn, isLoading, message } = useSiwe()

  async function onConnect() {
    try {
      const provider = new WalletConnectProvider({
        infuraId: 'f88abc181a4a45a6bc47bdda05a94944',
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
      return <div>Loading...</div>
    }
    return (
      <div>
        <button onClick={() => signIn()}>{!isLoggedIn ? 'Sign in' : 'Sign in again'}</button>
        &nbsp;
        <button disabled={!isLoggedIn} onClick={signOut}>
          Sign out
        </button>
        {isLoggedIn ? (
          <>
            <p>Logged in with {message.address}</p>
            <p>Nonce: {message.nonce}</p>
            <p>ChainId: {message.chainId}</p>
          </>
        ) : (
          <p>Not logged in</p>
        )}
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
