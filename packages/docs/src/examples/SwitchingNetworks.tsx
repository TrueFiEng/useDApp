import React from 'react'
import ReactDOM from 'react-dom'
import { Mainnet, DAppProvider, useSendTransaction, useEthers, Config, Goerli, ChainId } from '@usedapp/core'
import { getDefaultProvider, utils } from 'ethers'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
    [Goerli.chainId]: getDefaultProvider('goerli'),
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

  const disabled = chainId !== ChainId.Goerli

  const status = state.status
  const address = '0xe13610d0a3e4303c70791773C5DF8Bb16de185d1'

  const send = () => {
    void sendTransaction({ to: address, value: utils.parseEther('0.001') })
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
          <button onClick={() => switchNetwork(Goerli.chainId)} disabled={chainId === Goerli.chainId}>
            Switch to Goerli
          </button>
        }
      </div>
      <hr />
      <div>
        <div>Account: {account ?? 'not connected'}</div>
        {disabled ? (
          <p>Please change the network to Goerli to proceed.</p>
        ) : (
          <>
            <button onClick={() => send()}>Send ether</button>
            <p>Status: {status}</p>
          </>
        )}
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
