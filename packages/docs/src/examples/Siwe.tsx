import React from 'react'
import ReactDOM from 'react-dom'
import { Mainnet, DAppProvider, useEthers, Config } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import { SiweProvider, useSiwe } from '@usedapp/siwe'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
  },
}

ReactDOM.render(
  <DAppProvider config={config}>
    <SiweProvider backendUrl={'https://fastify-siwe-example.herokuapp.com'}>
      <App />
    </SiweProvider>
  </DAppProvider>,
  document.getElementById('root')
)

export function App() {
  const { account, activateBrowserWallet } = useEthers()
  const { signIn, signOut, isLoggedIn } = useSiwe()

  const SiweComponent = () => {
    return (
      <div>
        <button onClick={() => signIn()}>{!isLoggedIn ? 'Sign in' : 'Sign in again'}</button>
        &nbsp;
        <button disabled={!isLoggedIn} onClick={signOut}>
          Sign out
        </button>
        {isLoggedIn ? <p>Logged in with {account}</p> : <p>Not logged in</p>}
      </div>
    )
  }

  return (
    <div>
      {!account && <button onClick={() => activateBrowserWallet()}>Connect</button>}
      {account && <SiweComponent />}
    </div>
  )
}
