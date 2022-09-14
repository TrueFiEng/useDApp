import React from 'react'
import ReactDOM from 'react-dom'
import {
  DAppProvider,
  useSendTransaction,
  useEthers,
  Config,
  Goerli,
  Kovan,
  Rinkeby,
  Ropsten,
} from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import { MetamaskConnect } from './components/MetamaskConnect'

const config: Config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: getDefaultProvider('goerli'),
    [Kovan.chainId]: getDefaultProvider('kovan'),
    [Rinkeby.chainId]: getDefaultProvider('rinkeby'),
    [Ropsten.chainId]: getDefaultProvider('ropsten'),
  },
  gasLimitBufferPercentage: 10, // The percentage by which the transaction may exceed the estimated gas limit.
}

ReactDOM.render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>,
  document.getElementById('root')
)

export function App() {
  const { chainId, account } = useEthers()
  const { sendTransaction, state } = useSendTransaction()

  if (!config.readOnlyUrls[chainId]) {
    return <p>Please use either Goerli, Kovan, Rinkeby or Ropsten testnet.</p>
  }
  const status = state.status
  const address = '0xe13610d0a3e4303c70791773C5DF8Bb16de185d1'

  const send = () => {
    void sendTransaction({ to: address, value: 1 })
  }

  const WalletContent = () => (
    <div>
      <button onClick={() => send()}>Send ether</button>
      <p>Status: {status}</p>
    </div>
  )

  return (
    <div>
      <MetamaskConnect />
      {account && <WalletContent />}
    </div>
  )
}
