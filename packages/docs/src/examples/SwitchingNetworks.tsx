import React from 'react'
import ReactDOM from 'react-dom'
import { DAppProvider, useSendTransaction, useEthers, Config, Sepolia, Mainnet, Optimism } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
    [Optimism.chainId]: getDefaultProvider('optimism'),
    [Sepolia.chainId]: 'https://rpc2.sepolia.org',
  },
}

ReactDOM.render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>,
  document.getElementById('root')
)

export function App() {
  const { chainId, switchNetwork, activateBrowserWallet, account } = useEthers()
  const { sendTransaction, state } = useSendTransaction()

  const status = state.status
  const address = '0xe13610d0a3e4303c70791773C5DF8Bb16de185d1'

  const send = () => {
    void sendTransaction({ to: address, value: 1 })
  }

  const WalletContent = () => (
    <>
      <div>Current chain: {chainId}</div>
      <div>
        {
          <button onClick={() => switchNetwork(Mainnet.chainId)} disabled={chainId === Mainnet.chainId}>
            Switch to Mainnet
          </button>
        }{' '}
        {
          <button onClick={() => switchNetwork(Optimism.chainId)} disabled={chainId === Optimism.chainId}>
            Switch to Optimism
          </button>
        }{' '}
        {
          <button onClick={() => switchNetwork(Sepolia.chainId)} disabled={chainId === Sepolia.chainId}>
            Switch to Sepolia
          </button>
        }
      </div>
      <hr />
      <div>
        <div>Account: {account ?? 'not connected'}</div>
        <button onClick={() => send()}>Send ether</button>
        <p>Status: {status}</p>
        {state.errorMessage && <p>Error: {state.errorMessage}</p>}
      </div>
    </>
  )

  return (
    <div>
      {!account && <button onClick={() => activateBrowserWallet()}>Connect</button>}
      {account ? <WalletContent /> : <p>Connect to wallet to interact with the example.</p>}
    </div>
  )
}
